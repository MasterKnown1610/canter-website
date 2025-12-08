# React Router Installation

To complete the setup, you need to install React Router DOM:

```bash
npm install react-router-dom
```

After installation, you can:

1. **Access the home page**: `http://localhost:5173/`
2. **Access the business form**: `http://localhost:5173/business-form`

## Features Implemented:

### Multi-Step Business Form

- **Step 1**: Basic business information (name, contact, type, address, etc.)
- **Step 2**: Business-specific details (Restaurant or Temple)
- **Step 3**: Review and submit

### Restaurant Fields (Step 2):

- Upload menu (PDF/JPG/PNG)
- Operating days (multi-select)
- Opening/Closing times
- POS system selection

### Temple Fields (Step 2):

- Upload temple data (PDF/JPG/PNG)
- Active days (Daily/Weekly)
- Festival dates (date picker)
- Opening/Closing times

### UI Features:

- Progress bar showing completion
- Left-side information panel explaining why data is needed
- Responsive design matching existing UI
- Form validation
- File upload support
- Multi-select checkboxes
- Date picker for festivals

### Navigation:

- Separate route for the business form
- Back to home link
- Navigation between pages
- Sticky header on form page

The form follows the exact specifications you provided with a step-by-step approach and informative left panel.
