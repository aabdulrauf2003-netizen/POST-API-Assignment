# POST APIs for the uploaded project models

These controllers are based on the six Mongoose models in `models_070943.zip`: Admin, Category, Order, PasswordReset, Product, and User. The board photo was a sample; these files match the actual ZIP models.

## 1. Copy into your project
- Copy `controllers/` into the project root.
- Copy `routes/modelRoutes.js` into your `routes/` folder (or adjust the import paths if your folder structure differs).
- Keep your existing `models/` folder as-is.

## 2. Mount the routes in your Express app
```js
import express from 'express';
import modelRoutes from './routes/modelRoutes.js';

const app = express();
app.use(express.json());
app.use('/api', modelRoutes);
```

Your POST endpoints will be:
- `POST /api/admins`
- `POST /api/categories`
- `POST /api/orders`
- `POST /api/password-resets`
- `POST /api/products`
- `POST /api/users`

Install `bcryptjs` if it is not already installed: `npm install bcryptjs`.

## 3. Sample JSON bodies

### User — `/api/users`
```json
{"name":"Ali","email":"ali@example.com","phone":"03001234567","password":"ExamplePassword123"}
```
The API hashes the password and never returns it in the response.

### Admin — `/api/admins`
```json
{"username":"admin1","password":"ExamplePassword123"}
```
The API hashes the password and does not return it.

### Category — `/api/categories`
```json
{"id":"cold-drinks","name":"Cold Drinks","tagline":"Chilled drinks","image":"/images/drinks.jpg"}
```

### Product — `/api/products`
```json
{"id":"g1","cat":"cold-drinks","name":"Orange Juice","price":250,"img":"/images/orange-juice.jpg"}
```

### Order — `/api/orders`
```json
{"orderId":"ORD-1001","email":"ali@example.com","fullName":"Ali Khan","phone":"03001234567","paymentMethod":"Cash on Delivery","items":[{"id":"g1","name":"Orange Juice","price":250,"qty":2,"img":"/images/orange-juice.jpg"}],"total":500,"status":"Pending"}
```

### Password reset — `/api/password-resets`
```json
{"email":"ali@example.com","codeHash":"<hashed-reset-code>","expiresAt":"2026-10-21T16:00:00.000Z","attempts":0}
```
For security, send a **hashed** reset code in `codeHash`, never the plain reset code. In a real app, this endpoint should be protected/internal and the reset code should be generated and hashed server-side rather than accepted from an untrusted public client.

## Notes
- These handlers assume Express and ES modules, matching the model files' `import` syntax.
- `Order` accepts the model's optional fields from the request body. In production, derive the user identity and price totals on the server rather than trusting client-supplied values.
- Admin creation should be restricted to an authorized setup/admin workflow, not exposed publicly.
