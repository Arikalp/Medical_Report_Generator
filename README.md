# Medical Report Generator - Next.js Version

A modern, AI-powered medical image analysis application built with Next.js 14, TypeScript, and Google's Gemini AI.

## 🚀 Features

- **AI-Powered Analysis**: Uses Google Gemini 2.0 Flash for medical image analysis
- **PDF Report Generation**: Automatically generates professional PDF reports
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **File Upload**: Support for PNG, JPG, JPEG, BMP, and GIF images
- **Real-time Processing**: Instant analysis with loading states

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Google AI API Key (for Gemini)

## 🛠️ Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Google AI API key:
   ```
   GOOGLE_API_KEY=your_actual_google_gemini_api_key_here
   ```

   To get a Google AI API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will start at `http://localhost:3000`

### Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 📁 Project Structure

```
Medical_report_project/
├── app/
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts          # API route for image analysis
│   ├── layout.tsx                 # Root layout component
│   ├── page.tsx                   # Main page component
│   └── globals.css                # Global styles
├── lib/
│   ├── gemini.ts                  # Gemini AI configuration
│   └── pdf-generator.ts           # PDF generation utility
├── public/                        # Static assets
├── .env.example                   # Environment variables template
├── .env.local                     # Your environment variables (create this)
├── next.config.mjs                # Next.js configuration
├── package.json                   # Dependencies
├── tailwind.config.ts             # Tailwind CSS configuration
└── tsconfig.json                  # TypeScript configuration
```

## 🎯 Usage

1. **Enter Patient Information** (optional):
   - Add patient name or ID for the report

2. **Upload Medical Image**:
   - Click the file input or drag & drop an image
   - Supported formats: PNG, JPG, JPEG, BMP, GIF

3. **Generate Analysis**:
   - Click "Generate Analysis Report"
   - Wait for AI processing (usually 10-30 seconds)

4. **Review Results**:
   - View the uploaded image and AI analysis side-by-side
   - Read the detailed medical report

5. **Download PDF**:
   - Click "Download Full Report (PDF)" to save the report

## 🔧 Technologies Used

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Generative AI (Gemini 2.0 Flash)
- **PDF Generation**: jsPDF
- **Image Processing**: Sharp
- **UI Components**: React 18

## ⚠️ Important Notes

### Medical Disclaimer

This application is for **educational and informational purposes only**. It is NOT intended for:
- Clinical diagnosis
- Medical treatment decisions
- Professional medical advice
- Emergency medical situations

**Always consult qualified healthcare professionals** for any medical concerns.

### API Usage

- The Google Gemini API has rate limits
- Monitor your usage in the [Google AI Studio Console](https://makersuite.google.com/)
- Free tier has limitations; consider upgrading for production use

### Security

- Never commit `.env.local` to version control
- Keep your API keys secure
- Implement proper authentication for production deployment
- Consider HIPAA compliance if handling real patient data

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to a Git repository (GitHub, GitLab, Bitbucket)
2. Import the project in [Vercel](https://vercel.com)
3. Add your `GOOGLE_API_KEY` in the Environment Variables section
4. Deploy!

### Other Platforms

The application can be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Run
- Railway
- Render

Make sure to set the `GOOGLE_API_KEY` environment variable in your deployment platform.

## 🐛 Troubleshooting

### API Key Error
```
Error: GOOGLE_API_KEY is not set in environment variables
```
**Solution**: Create `.env.local` file and add your API key

### Image Upload Fails
**Solution**: Check file size (max 10MB) and format (PNG, JPG, JPEG, BMP, GIF)

### Analysis Timeout
**Solution**: Your image might be too large. Try resizing or compressing it first

### Build Errors
**Solution**: 
```bash
rm -rf node_modules .next
npm install
npm run build
```

## 📝 Comparison with Python Version

| Feature | Python (Streamlit) | Next.js |
|---------|-------------------|---------|
| Framework | Streamlit | Next.js 14 |
| Language | Python | TypeScript |
| PDF Library | ReportLab | jsPDF |
| Hosting | Streamlit Cloud | Vercel/Any |
| Performance | Good | Excellent |
| Scalability | Limited | High |
| Mobile Support | Basic | Full |
| Customization | Limited | Unlimited |

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork the repository
- Submit pull requests
- Report issues
- Suggest improvements

## 📄 License

Educational use only. Not licensed for clinical or commercial use.

## 👨‍💻 Developer

Developed by **Sankalp**

For questions or support, please create an issue in the repository.

---

**Remember**: This tool is for demonstration purposes only and should never replace professional medical advice or diagnosis.
