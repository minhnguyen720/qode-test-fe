# Frontend Technical Design Document: Image Feed & Commenting Application

## 1. Project Overview

This document outlines the frontend architecture for a social-style
image feed application. The application allows users to view a feed of
posts, upload new images, and engage with specific images through
comments.

### 1.1 Tech Stack

- **Framework:** Next.js (App Router)
- **UI Library:** Ant Design (AntD)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Package Manager:** Yarn

## 2. Directory Structure

The project follows the standard Next.js App Router structure, with a
focus on modular component design.

    fe/
    ├── app/
    │   ├── components/            # Reusable UI components
    │   │   ├── CommentBox/        # Container for displaying comment lists
    │   │   ├── CommentForm/       # Input form for submitting new comments
    │   │   ├── DetailModal/       # Modal view for specific image & comment interaction
    │   │   ├── Post/              # Individual feed item card
    │   │   ├── UploadImage/       # Image upload logic and UI
    │   │   └── index.ts           # Barrel file for clean imports
    │   ├── constants/             # App-wide constants (config, labels, mock data)
    │   ├── layout.tsx             # Root layout (Html, Body, AntD Providers)
    │   ├── page.tsx               # Main entry point (Feed View)
    │   └── globals.css            # Global styles and Tailwind directives
    ├── public/                    # Static assets
    ├── next.config.ts             # Next.js configuration
    ├── tailwind.config.ts         # Tailwind configuration
    └── package.json               # Dependencies and scripts

## 3. Component Architecture

The application is decomposed into functional units to separate concerns
between data display, user input, and modal interactions.

### 3.1 Core Components

#### **UploadImage**

- **Responsibility:** Handles file selection and upload.
- **UI:** Uses Ant Design's `<Upload />` component.
- **Props:**
  - `onSuccess`: Callback function triggered after a successful
    upload.
- **Key Logic:**
  - Validates file types (JPEG, PNG).
  - Manages uploading state.
  - Sends image to backend and refreshes feed.

#### **Post**

- **Responsibility:** Renders a single image card in the main feed
  grid.
- **UI:** Tailwind-styled card with image + metadata.
- **Props:**
  - `item`: Image object (URL, ID, author).
  - `openModalCallback`: callback functon to define behavior when opens DetailModal for this image.

#### **DetailModal**

- **Responsibility:** Interactive full-size image viewer + comments.
- **UI:** AntD `<Modal />` styled with Tailwind.
- **Props:**
  - Extend from `Modal Props` provied by ModalProps from antd
  - `detailItem`: information of post.
- **Composition:** Includes CommentBox and CommentForm.

#### **CommentBox**

- **Responsibility:** Displays comments for a given image ID.
- **UI:** Scrollable list.
- **Props:**
  - `createdBy`: Record the information of who create the comment.
  - `createdAt`: Record time the comment was created.
  - `content`: Comment content.

#### **CommentForm**

- **Responsibility:** Submits new comments.
- **UI:** Textarea + Submit button.
- **Props:**
  - `detailItem`: information of post.
  - `onCommentSubmit`: refetch function.

## 4. Feature Workflows

### 4.1 Image Upload Flow

1.  User clicks Upload button.
2.  UploadImage component opens file selector.
3.  Image sent to backend.
4.  On success, feed revalidates to display the new image.

### 4.2 Commenting Flow

1.  User clicks a Post item.
2.  DetailModal opens with selected image.
3.  Comments are fetched via API.
4.  User submits new comment through CommentForm.
5.  CommentBox refreshes and displays new comment.
6.  The latest comment (based on createdAt) will be display first

## 5. Styling Strategy (Tailwind + AntD)

- **AntD:** Used for modals, forms, uploads.
- **Tailwind:** Used for layout, spacing, typography.
- **Overrides:** Applied sparingly using layers in `globals.css`.

## 6. Data Management

- **Fetching:** Uses Next.js App Router (Server/Client Components) and axios.
- **State:** React `useState` for UI, server revalidation for data
  updates.
