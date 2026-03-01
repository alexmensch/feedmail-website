export default {
  async fetch(request) {
    const { pathname } = new URL(request.url);

    if (pathname === "/") {
      return new Response("<!doctype html><html><head><title>feedmail</title></head><body></body></html>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    return new Response(null, { status: 404 });
  },
};
