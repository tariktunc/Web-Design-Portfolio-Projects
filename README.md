### Live Stream

#### [Portfolio Web Site](https://tariktunc.vercel.app/)

## Project Name: Personal Portfolio Website

This project is an open-source template that can be used to create a personal portfolio website. Below are step-by-step instructions for initializing and customizing the project.

## Technologies

-  [Next.js](https://nextjs.org/) - React-based web application framework.
-  [React](https://reactjs.org/) - JavaScript library used for building user interfaces.
-  [Redux](https://redux.js.org/) - JavaScript library used for state management.
-  [Radix](https://radix-ui.com/) - Creating UI components using the component-first design system.
-  [Clerk](https://clerk.com/docs) - Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.
-  [Tailwind CSS](https://tailwindcss.com/) - Fast and customizable CSS framework.
-  [react-i18next](https://react.i18next.com/) - react-i18next is an internationalization-framework written in and for JavaScript. (Waiting)

# Installation

1. Clone the project:

   ```bash
   git clone https://github.com/username/your-name-portfolio.git
   cd your-name-portfolio
   ```

2. Install the necessary dependencies:

   ```bash
   npm install
   ```

3. Start the project:

   ```bash
   npm run dev
   ```

4. The project will [run](http://localhost:3000) at
   ```plaintext
   http://localhost:3000
   ```
5. Create an env file and add the required keys into it. You will place the keys in this file.

-  For example, create a file named `.env.local` and add the following content:

-  Deployment (Vercel, etc.):
-  In your Vercel project settings, add these environment variables:

```plaintext
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_public_key_here
CLERK_SECRET_KEY=your_secret_key_here
```

-  Remember: Safely store and avoid sharing your environment variables.

## Customization

1. Add your personal information by editing the files in the src/data directory.

2. Add your own content by editing the pages in the src/pages directory.

3. Customize the project as you wish and add new components.

## Contribution

If you want to contribute to this project, please submit a pull request. Your contributions are welcome!

## License

This project is licensed under the MIT license. For detailed information, refer to the LICENSE file.

#### This project can be your starting point for creating your personal portfolio website. If you have any questions or suggestions, feel free to contact us!
