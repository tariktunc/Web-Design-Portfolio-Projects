"use client";
import React from "react";
import { ThemeContext } from "@/utils/context";
import { SignUp } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes"; // clerk dark light mode, default light olarak geliyor.

export default function Page() {
	const { theme } = React.useContext(ThemeContext) as { theme: string };

	return (
		<SignUp
			appearance={{ baseTheme: theme === "dark" ? dark : undefined }}
			routing="path" // Sayfalarınız için kullanılan yönlendirme stratejisini belirler. 'hash', 'path' veya 'virtual' olabilir. Next.js veya Remix için ortam değişkenleri kullanılıyorsa, bu değer 'path' olarak ayarlanır.
			path="/sign-up" // Path tabanlı yönlendirme kullanıldığında bileşenin monte edildiği yolunu belirtir, örneğin /sign-in.
			redirectUrl="/" // Başarılı bir şekilde giriş yapılması veya kayıt olunması durumunda yönlendirilecek tam URL veya yolunu belirler.
			signInUrl="/sign-in/" // Kayıt Ol' bağlantısının hedefini belirlemek için kullanılır, tam URL veya yol olarak sağlanır.
			afterSignInUrl="/" // Başarılı bir şekilde giriş yapılması durumunda yönlendirilecek tam URL veya yolunu belirler.
			afterSignUpUrl="/" // Başarılı bir şekilde kayıt olunması durumunda yönlendirilecek tam URL veya yolunu belirler.
		/>
	);
}
