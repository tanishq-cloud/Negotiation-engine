# Negotiation Engine

Negotiation Engine is a real-time chat-based application that facilitates offer sharing and analysis for negotiation purposes. This app is designed to help users streamline the negotiation process, view historical data, and make informed decisions based on similarity indices.

## Overview

The Negotiation Engine is developed using React and Firebase Realtime Database. It allows users to propose and discuss offers in a chat-like interface, view negotiation details, and analyze the likelihood of offer acceptance using a similarity index.

## Features

- **Real-Time Chat:** Users can engage in real-time chat discussions to share and discuss offers.
- **Offer Form:** Propose new offers using the offer form, providing details like product, price, quantity, and more.
- **Console Panel:** The console panel displays all negotiation data, proposed offers, and counter offers for easy reference.
- **Similarity Analysis:** The app calculates a similarity index based on the Euclidean distance between the initial and final negotiation data.
- **Firebase Integration:** Utilizes Firebase Realtime Database for real-time data synchronization and storage.

## How it Works

1. **Authentication:**
   - Users can sign in using Google authentication to access the negotiation features.

2. **Chat Interface:**
   - Engage in chat conversations to discuss and finalize negotiation details.

3. **Offer Form:**
   - Use the offer form to propose new offers with relevant details.

4. **Console Panel:**
   - The console panel displays a history of negotiations, proposed offers, and counter offers.

5. **Similarity Analysis:**
   - The app calculates a similarity index using the Euclidean distance between the initial and final negotiation data.

## Development

### Technologies Used

- React.js
- Firebase Realtime Database
- React Bootstrap

### Calculating Similarity Index

The similarity index is calculated using the Euclidean distance formula, providing a quantitative measure of how similar two sets of negotiation data are. The formula is as follows:

```math
Similarity = 1 / (1 + sqrt(sum((value1 - value2)^2)))
```

### Firebase Realtime Database
Firebase Realtime Database is used for storing negotiation data in real-time, allowing seamless synchronization across connected clients.

### Build and Run
Clone the repository.
Install dependencies: `npm install`
Start the development server: `npm run start`
