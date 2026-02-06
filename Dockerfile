# הגדרת שרת Nginx קליל (בלי Node ובלי התקנות)
FROM nginx:alpine

# העתקת כל קבצי האתר (HTML/CSS/JS) לתיקייה של השרת
COPY . /usr/share/nginx/html

# העתקת הגדרות השרת שיצרנו
COPY nginx.conf /etc/nginx/conf.d/default.conf

# חשיפת הפורט
EXPOSE 80

# הפעלת השרת
CMD ["nginx", "-g", "daemon off;"]
