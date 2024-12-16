# X Vote Vault

X Vote Vault is a web application designed to simplify and secure the voting process. Built using **ReactJS**, **Next.js**, **TailwindCSS**, and **MongoDB**, this project provides a seamless way to create, manage, and participate in polls.

## Features

### Admin Panel
1. **Authentication**:
   - Secure login system implemented using **JWT** and **secure cookies**.
   - Admins must log in to access the dashboard.
![image](https://github.com/user-attachments/assets/e4612123-1c79-4191-a5bb-8c340b2654b1)

2. **Create a Poll**:
   - A form allows admins to set a **vote title** and add multiple options for voting.
   - New options can be added dynamically using the **Add Option** button.
![image](https://github.com/user-attachments/assets/f154d54d-36c2-45c4-8927-f01ce3a15b35)

3. **Start a Poll**:
   - Once the poll is ready, the **Start Poll** button makes the poll live and accessible to users.

4. **View Results**:
   - Admins can view real-time voting results displayed in percentages for each option.
![image](https://github.com/user-attachments/assets/20bf8323-b706-4cea-ab02-98dc8d106952)

### User Registration and Voting
1. **User Registration**:
   - Users can register with their **name** and **email** on the registration page.
   - A unique voting link is sent to the user's registered email.
![image](https://github.com/user-attachments/assets/fcfa6385-4249-45d4-a92d-42976e00df95)

2. **Voting**:
   - Users can vote through the unique link they receive via email.
   - Each user is restricted to voting **once** to ensure fairness.
![image](https://github.com/user-attachments/assets/f20f21ef-c3a2-429e-a9d7-664ce3130b22)

## Project Tech Stack
- **Frontend**: ReactJS, Next.js, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT, Secure Cookies

 
