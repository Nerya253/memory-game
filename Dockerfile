# --- שלב 1: הבנייה (Build Stage) ---
FROM node:20-alpine as build

WORKDIR /app

# התקנת ספריות
COPY package*.json ./
RUN npm install

# העתקת הקוד ובנייה
COPY . .
# הפקודה הזו יוצרת תיקיית 'dist' או 'build' עם המשחק המוכן
RUN npm run build

# --- שלב 2: ההגשה (Production Stage) ---
FROM nginx:alpine

# מעתיקים רק את הקבצים המוכנים משלב 1 לתוך ה-Nginx
# שים לב: אם אצלך התיקייה נקראת build (ב-create-react-app), שנה את dist ל-build
COPY --from=build /app/dist /usr/share/nginx/html

# מעתיקים את ההגדרות של Nginx (נצור את הקובץ הזה תכף)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
