export async function GET(request) {
	return new Response(JSON.stringify({ message: 'API is working', method: 'GET' }), {
	  status: 200,
	  headers: { 'Content-Type': 'application/json' },
	})
  }
  
  export async function POST(request) {
	return new Response(JSON.stringify({ message: 'API is working', method: 'POST' }), {
	  status: 200,
	  headers: { 'Content-Type': 'application/json' },
	})
  }