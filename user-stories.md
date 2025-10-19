- [ ] Connect MongoDB (`config/db.js`)
- [ ] Test server connection with “Hello API” route
- [ ] Setup `.env` variables (`PORT`, `MONGO_URI`, `JWT_SECRET`)

✅ **Deliverable:** Express + MongoDB connected and running with Nodemon.

---

## 👤 Stage 2: User Authentication

- [ ] Create `models/User.js` with fields:
- name, email, password, createdAt
- [ ] Create `controllers/authController.js`:
- [ ] `registerUser`
- [ ] `loginUser`
- [ ] `getUserProfile`
- [ ] Add password hashing using **bcryptjs**
- [ ] Add JWT token creation & verification
- [ ] Create middleware `authMiddleware.js` for protected routes
- [ ] Create `routes/authRoutes.js`
- [ ] Test all routes in Postman

✅ **Deliverable:** `/api/auth/register`, `/api/auth/login`, `/api/users/profile` working with JWT.

---

## 🛠️ Stage 3: Maintenance Records

- [ ] Create `models/Maintenance.js` with fields:
- userId, date, mileage, serviceType, cost, notes, photo
- [ ] Create `controllers/maintenanceController.js`:
- [ ] `addMaintenance`
- [ ] `getUserMaintenances`
- [ ] `updateMaintenance`
- [ ] `deleteMaintenance`
- [ ] Create `routes/maintenanceRoutes.js`
- [ ] Protect all routes with JWT middleware
- [ ] (Optional) Setup **Multer** for image upload
- [ ] Test CRUD endpoints with Postman

✅ **Deliverable:** `/api/maintenance` CRUD working per authenticated user.

---

## 💰 Stage 4: Parts Savings Tracker

- [ ] Create `models/Part.js` with fields:
- userId, partName, price, saved, notes, image, purchased
- [ ] Create `controllers/partController.js`:
- [ ] `addPart`
- [ ] `getUserParts`
- [ ] `updatePart`
- [ ] `deletePart`
- [ ] (Optional) `updateSavings`
- [ ] Create `routes/partRoutes.js`
- [ ] Protect routes with JWT middleware
- [ ] Test all routes with Postman

✅ **Deliverable:** `/api/parts` CRUD + savings tracking working.

---

## 📊 Stage 5: Dashboard & Analytics (Optional)

- [ ] Create `controllers/dashboardController.js`
- [ ] Endpoint for total maintenance cost
- [ ] Endpoint for total savings
- [ ] Endpoint for purchased parts count
- [ ] Use MongoDB aggregation or simple queries
- [ ] Create `routes/dashboardRoutes.js`
- [ ] Test endpoints

✅ **Deliverable:** `/api/dashboard/summary` returns aggregated user data.

---

## ⚙️ Stage 6: Optimization & Extras

- [ ] Add request validation (check required fields)
- [ ] Improve error handling with custom messages
- [ ] Add security enhancements:
- [ ] helmet
- [ ] express-rate-limit
- [ ] Write API documentation (Postman Collection / Swagger)
- [ ] Clean up unused code and comments
- [ ] Final testing and review

✅ **Deliverable:** Secure, stable, and documented backend ready for frontend integration.

---

## ✅ Final Folder Structure

backend/
├── server.js
├── config/
│ └── db.js
├── controllers/
│ ├── authController.js
│ ├── maintenanceController.js
│ ├── partController.js
│ └── dashboardController.js
├── middleware/
│ └── authMiddleware.js
├── models/
│ ├── User.js
│ ├── Maintenance.js
│ └── Part.js
├── routes/
│ ├── authRoutes.js
│ ├── maintenanceRoutes.js
│ ├── partRoutes.js
│ └── dashboardRoutes.js
└── .env
