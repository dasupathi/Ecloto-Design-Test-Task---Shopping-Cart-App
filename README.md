# Shopping Cart Application

This is a simple React shopping cart application that allows users to add products to a shopping cart, update quantities, and track their progress towards earning a free gift.

## Features

- Display a list of products.
- Add products to the cart with a quantity selector.
- Update product quantities in the cart.
- Remove products from the cart.
- Track progress towards a free gift when the cart subtotal reaches a threshold.
- Automatically add a free gift to the cart when the threshold is reached.
- Show a progress bar indicating the amount needed to earn the free gift.

## Requirements

- Node.js (version 14 or above)
- npm or yarn

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/shopping-cart-app.git
   cd shopping-cart-app
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to see the application.

## Implementation Details

### Components

- `ProductList`: Displays a list of products.
- `ProductItem`: Displays an individual product with a quantity selector and an "Add to Cart" button.
- `Cart`: Displays the shopping cart with added products.
- `CartItem`: Displays an individual item in the cart with quantity update and remove buttons.
- `ProgressBar`: Shows progress towards earning the free gift.

### State Management

- React's built-in state management (`useState`, `useEffect`) is used to manage the state of the products and the cart.

### Free Gift Logic

- A free gift is automatically added to the cart when the subtotal reaches a predefined threshold.
- The free gift cannot be manually removed and will be removed if the cart value goes below the threshold.

## Recording

The entire development process was recorded. You can view the recording on Google Drive using the following link:

[Google Drive Recording Link](https://drive.google.com/your-recording-link)

## Contact

For any questions or issues, please contact [your-email@example.com].
