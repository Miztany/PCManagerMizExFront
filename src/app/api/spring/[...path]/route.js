import { NextResponse } from "next/server";

async function handleRequest(request, {params}, method){
	try{
		const headers = new Headers();
		for (const [key,value] of request.headers.entries()){
			headers.append(key, value);
		}

		const path = '/' + params.path.join('/');
		let url = new URL(path, process.env.NEXT_HIDDEN_SPRING_URL);
		let options = {method, headers, duplex:'half'};

		for (const [key, value] of request.nextUrl.searchParams.entries()){
			url.searchParams.append(key,value);
		}
		
		if(method==='POST'){
			options.body = request.body;
		}

		const externalResponse = await fetch(url,options);

		const responseHeaders = new Headers();
		for (const [key, value] of externalResponse.headers.entries()){
			responseHeaders.append(key, value);
		}

		const data = await externalResponse.text();

		return new NextResponse(data, {
			status: externalResponse.status,
			headers: responseHeaders,
		});
	}catch(error){
		console.error(`Error fowarding ${method} request to external API:`, error);
		return NextResponse.json({error: `Internal Server Error`}, {status:500});
	}
}

export async function GET(request, context){
	return handleRequest(request, context, 'GET');
}

export async function POST(request, context){
	return handleRequest(request, context, 'POST');
}
