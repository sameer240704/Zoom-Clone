# Virtual Vibe

Elevate your video calls with ease. Enjoy crisp audio, HD video, and secure meetings. Your go-to for seamless virtual communication.

## Cloning the repository

```bash
  git clone https://github.com/sameer240704/virtual-vibe.git
  cd virtual-vibe
```

## Installation

Install the project dependencies

```bash
  npm install
```

## Setup the Environment Variables

Create a new file named `.env.local` in the root directory of the project and add the following content or enter your credentials from [GetStream](https://getstream.io/video/) and [Clerk](https://clerk.com/) in the `.env.local.example`:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_STREAM_API_KEY=
STREAM_SECRET_KEY=

NEXT_PUBLIC_BASE_URL=
```

## Running the Project

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project

```bash
  npm run dev
```
