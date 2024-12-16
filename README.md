# X Vote Vault

X Vote Vault is a web application designed to simplify and secure the voting process. Built using **ReactJS**, **Next.js**, **TailwindCSS**, and **MongoDB**, this project provides a seamless way to create, manage, and participate in polls.

## Features

### Admin Panel
1. **Authentication**:
   - Secure login system implemented using **JWT** and **secure cookies**.
   - Admins must log in to access the dashboard.

2. **Create a Poll**:
   - A form allows admins to set a **vote title** and add multiple options for voting.
   - New options can be added dynamically using the **Add Option** button.

3. **Start a Poll**:
   - Once the poll is ready, the **Start Poll** button makes the poll live and accessible to users.

4. **View Results**:
   - Admins can view real-time voting results displayed in percentages for each option.

### User Registration and Voting
1. **User Registration**:
   - Users can register with their **name** and **email** on the registration page.
   - A unique voting link is sent to the user's registered email.

2. **Voting**:
   - Users can vote through the unique link they receive via email.
   - Each user is restricted to voting **once** to ensure fairness.

## Project Tech Stack
- **Frontend**: ReactJS, Next.js, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Secure Cookies

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/x-vote-vault.git
   cd x-vote-vault
