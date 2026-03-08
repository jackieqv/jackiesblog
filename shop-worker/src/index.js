export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Basic CORS for your GitHub Pages site
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://jackieqv.github.io",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      if (url.pathname === "/api/checkout" && request.method === "POST") {
        return await handleCheckout(request, env, corsHeaders);
      }

      if (url.pathname === "/api/weather" && request.method === "GET") {
        return await handleWeather(url, env, corsHeaders);
      }

      return json({ error: "Not found" }, 404, corsHeaders);
    } catch (err) {
      return json(
        { error: "Server error", details: String(err.message || err) },
        500,
        corsHeaders
      );
    }
  }
};

async function handleCheckout(request, env, corsHeaders) {
  const body = await request.json();

  // Allowed products only: never trust browser prices
  const PRODUCTS = {
    wildflower_card: {
      name: "Wildflower watercolour card",
      unit_amount: 490,
      currency: "eur"
    },
    spring_flowers_card: {
      name: "Spring flowers watercolour card",
      unit_amount: 490,
      currency: "eur"
    }
  };

  const item = PRODUCTS[body.product_id];
  if (!item) {
    return json({ error: "Invalid product" }, 400, corsHeaders);
  }

  const quantity = Math.max(1, Math.min(Number(body.quantity || 1), 10));

  // Choose shipping rates you created in Stripe Dashboard
  // Example logic: Germany + EU
  const shippingOptions = [
    env.STRIPE_SHIPPING_RATE_GERMANY
      ? { shipping_rate: env.STRIPE_SHIPPING_RATE_GERMANY }
      : null,
    env.STRIPE_SHIPPING_RATE_EU
      ? { shipping_rate: env.STRIPE_SHIPPING_RATE_EU }
      : null
  ].filter(Boolean);

  const form = new URLSearchParams();
  form.set("mode", "payment");
  form.set("success_url", "https://jackieqv.github.io/jackiesblog/shop-success/");
  form.set("cancel_url", "https://jackieqv.github.io/jackiesblog/watercolour/shop/");
  form.set("billing_address_collection", "required");

  // Collect shipping address
  form.set("shipping_address_collection[allowed_countries][0]", "DE");
  form.set("shipping_address_collection[allowed_countries][1]", "AT");
  form.set("shipping_address_collection[allowed_countries][2]", "FR");
  form.set("shipping_address_collection[allowed_countries][3]", "NL");
  form.set("shipping_address_collection[allowed_countries][4]", "BE");

  // Product line item
  form.set("line_items[0][quantity]", String(quantity));
  form.set("line_items[0][price_data][currency]", item.currency);
  form.set("line_items[0][price_data][unit_amount]", String(item.unit_amount));
  form.set("line_items[0][price_data][product_data][name]", item.name);

  // Attach Stripe shipping rates
  shippingOptions.forEach((opt, i) => {
    form.set(`shipping_options[${i}][shipping_rate]`, opt.shipping_rate);
  });

  const stripeResp = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: form
  });

  const stripeData = await stripeResp.json();

  if (!stripeResp.ok) {
    return json(
      { error: "Stripe error", details: stripeData },
      stripeResp.status,
      corsHeaders
    );
  }

  return json({ url: stripeData.url }, 200, corsHeaders);
}

async function handleWeather(url, env, corsHeaders) {
  const q = url.searchParams.get("q") || "Berlin";

  // Current weather endpoint through your Worker
  const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
  weatherUrl.searchParams.set("q", q);
  weatherUrl.searchParams.set("appid", env.OPENWEATHER_API_KEY);
  weatherUrl.searchParams.set("units", "metric");

  const weatherResp = await fetch(weatherUrl.toString());
  const weatherData = await weatherResp.json();

  if (!weatherResp.ok) {
    return json(
      { error: "OpenWeather error", details: weatherData },
      weatherResp.status,
      corsHeaders
    );
  }

  // Return only the fields your site needs
  const safe = {
    city: weatherData.name,
    country: weatherData.sys?.country,
    temp_c: weatherData.main?.temp,
    description: weatherData.weather?.[0]?.description,
    icon: weatherData.weather?.[0]?.icon
  };

  return json(safe, 200, corsHeaders);
}

function json(data, status = 200, corsHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    }
  });
}
