import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: 'Manager ID',
			credentials: {
				employeeNum: { label: "社員番号", type: "text" },
				password: { label: "パスワード", type: "password" }
			},
			async authorize(credentials, req) {
				const loginUrl = process.env.NEXT_PUBLIC_SPRING_URL + '/login';
				const res = await fetch(loginUrl, {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { "Content-Type": "application/json" }
				})
				const data = await res.json();
				if (res.ok && data.result) {
					return data.content;
				}else{
					return null;
			}
			}
		})
	],
	pages: {
		signIn: '/signin',
	},
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }