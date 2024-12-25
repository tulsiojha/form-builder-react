export async function POST(req: Request) {
  const { prompt } = await req.json();
  const res = await fetch(
    "https://form-builder-api.ojhabikash.com.np/api/generate",
    {
      method: "post",
      headers: new Headers({
        "content-type": "application/json",
      }),

      body: JSON.stringify({
        prompt,
      }),
    },
  );
  const data = await res.json();

  return Response.json({ data: data.data });
}
