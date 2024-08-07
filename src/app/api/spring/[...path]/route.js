import { NextResponse } from "next/server";

async function handleRequest(request, context, method){
	try{
		const headers = new Headers();
		for (const [key,value] of request.headers.entries()){
			headers.append(key, value);
		}

		const path = '/' + context.params.path.join('/');
		let url = new URL(process.env.NEXT_HIDDEN_SPRING_URL + path);
		let options = {method, headers, duplex:'half'};

		for (const [key, value] of new URL(request.url).searchParams.entries()){
			url.searchParams.append(key, value);
		}
		
		if(method==='POST'){
			const contentType = request.headers.get('content-type');
			if (contentType && contentType.includes('application/json')){
				options.body = JSON.stringify(await request.json());
			}else{
				options.body = await request.text();
			}
		}

		const externalResponse = await fetch(url.toString(), options);
		
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
		console.error(error.stack)
		return NextResponse.json({error: `Internal Server Error`}, {status:500});
	}
}

export async function GET(request, context){
	return handleRequest(request, context, 'GET');
}

export async function POST(request, context){
	return handleRequest(request, context, 'POST');
}
