const ORIGIN = "https://motivation-wallpaper2.vercel.app/api/image";

export default {
  async fetch(request) {
    const target = new URL(ORIGIN);
    // Уникальный параметр, чтобы ни Cloudflare, ни Vercel не отдали кеш.
    target.searchParams.set("_cb", crypto.randomUUID());

    const upstream = await fetch(target.toString(), {
      headers: {
        accept: "image/jpeg,image/*",
        "user-agent": "motivation-wallpaper-proxy/1.0",
      },
    });

    const headers = new Headers(upstream.headers);
    headers.set("cache-control", "no-store, no-cache, must-revalidate, max-age=0");
    headers.set("pragma", "no-cache");
    headers.set("access-control-allow-origin", "*");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  },
};
