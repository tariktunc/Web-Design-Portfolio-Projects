"use client";
import React from "react";
import { SignIn } from "@clerk/nextjs";
import { ThemeContext } from "@/utils/context";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes"; // clerk dark light mode, default light olarak geliyor.

export default function Page() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<SignIn
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }} // Giriş sayfasının görünümünü belirler. Clerk'in varsayılan temaları kullanılıyorsa, Clerk'in varsayılan temaları kullanılır. Clerk'in varsayılan temaları kullanılmıyorsa, Clerk'in varsayılan temaları kullanılır.
			routing="path" // Sayfalarınız için kullanılan yönlendirme stratejisini belirler. 'hash', 'path' veya 'virtual' olabilir. Next.js veya Remix için ortam değişkenleri kullanılıyorsa, bu değer 'path' olarak ayarlanır.
			path="/sign-in" // Path tabanlı yönlendirme kullanıldığında bileşenin monte edildiği yolunu belirtir, örneğin /sign-in.
			redirectUrl="/" // Başarılı bir şekilde giriş yapılması veya kayıt olunması durumunda yönlendirilecek tam URL veya yolunu belirler.
			signUpUrl="/sign-up" // Kayıt Ol' bağlantısının hedefini belirlemek için kullanılır, tam URL veya yol olarak sağlanır.
			afterSignInUrl="/" // Başarılı bir şekilde giriş yapılması durumunda yönlendirilecek tam URL veya yolunu belirler.
			afterSignUpUrl="/" // Başarılı bir şekilde kayıt olunması durumunda yönlendirilecek tam URL veya yolunu belirler.
		/>
	);
}
