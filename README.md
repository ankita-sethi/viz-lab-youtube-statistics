# Interactive Visualization of Global YouTube Statistics (2023)

## Overview

This project is an interactive data visualization web application that explores global
YouTube channel statistics from 2023. It helps users understand trends in popularity,
geographic distribution, channel types, and performance metrics through dynamic charts.

The application focuses on making large scale social media data easier to explore using
clear, interactive visual analytics.

---

## Dataset

**Name:** Global YouTube Statistics 2023  
**Source:** Kaggle  
**Link:** https://www.kaggle.com/datasets/nelgiriyewithana/global-youtube-statistics-2023

**Size**

- 588 YouTube channels
- 16 attributes

**Key attributes include**

- Subscribers
- Total video views
- Channel rank
- Country
- Channel type
- Upload count
- Estimated yearly earnings
- Channel creation year and month

This dataset provides a snapshot of the global YouTube creator ecosystem and enables
analysis of popularity, competition, growth, and regional trends.

---

## Features

- Dropdown menu to select variables dynamically
- Bar charts for categorical variables
- Histograms for numerical variables
- Toggle to switch chart orientation (vertical / horizontal)
- Scatter plots for comparing two selected variables
- Toggle to swap X and Y axes in scatter plots
- Dark themed interface for better readability

---

## Technologies Used

- React
- JavaScript
- D3.js
- HTML
- CSS

---

## Running the Project Locally

1. Clone the repository
2. Navigate to the project folder
3. Install dependencies
4. Start the application
5. Open http://localhost:3000 in your browser

---

## Demo(/Demo - l1.mov)

A voice narrated demo video demonstrates all features of the application, including:

- Variable selection
- Chart updates
- Scatter plot interactions
- Axis toggling
- Layout changes

---

## Notes

- `node_modules` is intentionally excluded
- Data is loaded from CSV and processed dynamically
- All charts are rendered client side using D3.js
