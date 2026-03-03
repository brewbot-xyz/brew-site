export async function GET() {
  return Response.json(
    {
      errorMessage: "This API has been deprecated and is no longer available.",
      errors: [],
    },
    { status: 410 },
  );
}
