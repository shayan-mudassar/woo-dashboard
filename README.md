# WooAYS: WooCommerce CRUD System

WooAYS is a React.js application designed to streamline the management of your WooCommerce store. It offers a responsive and user-friendly interface for shop managers, enabling seamless Create, Read, Update, and Delete (CRUD) operations on WooCommerce products.

## Features

- **Product Management**: Easily add, edit, view, and delete products within your WooCommerce store.
- **Responsive Design**: Optimized for various devices, ensuring a consistent experience across desktops, tablets, and mobile devices.
- **User-Friendly Interface**: Intuitive design tailored for shop managers to efficiently manage store products.

## Prerequisites

Before setting up WooAYS, ensure you have the following installed:

- **Node.js**: JavaScript runtime environment.
- **npm**: Node package manager, typically installed alongside Node.js.

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/shayan-mudassar/woo-dashboard.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd woo-dashboard
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Configure Environment Variables**:

   - Rename the `.env.dist` file to `.env`.
   - Open the `.env` file and update the following variables with your WordPress URLs:

     ```env
     REACT_APP_LIVE_STORE_URL=https://your-live-store-url.com
     REACT_APP_LOCAL_STORE_URL=http://your-local-store-url.test
     ```

## Running the Application

- **Development Mode** (uses `REACT_APP_LOCAL_STORE_URL`):

  ```bash
  npm run start
  ```

  This command starts the application in development mode, enabling features like hot-reloading for efficient development.

- **Production Build** (uses `REACT_APP_LIVE_STORE_URL`):

  ```bash
  npm run build
  ```

  This command creates an optimized production build of the application, ready for deployment.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and create a pull request. For major changes, it's advisable to open an issue first to discuss the proposed modifications.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

By following this README, you should be able to set up and run the WooAYS application seamlessly. If you encounter any issues or have questions, feel free to open an issue in the repository. 
