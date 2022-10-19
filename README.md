# EasyKPI
EasyKpi is a tool where a company can centralise all it's business processes' KPI (Key Performance Indicators) and their committed target values, independently of its origin software systems. 
The KPIs are assigned to a certain KPI-Owner, who is able to edit the KPIs for each month of a business year. 
The main feature is the KPI-Board which shows all the company's monthly KPIs in comparison with the committed target value. 
KPIs who meet the target are shown as green box, KPIs who miss the target are shown as red box, so one can 
receive an impression of all processes' performances at the first view.

## Impression
<img width="1008" alt="EasyKpi-KpiBoard" src="https://user-images.githubusercontent.com/108395674/190125103-c98c390d-19d8-4424-88cc-b16887d2be48.png">

## Badges
Backend: <br>
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-backend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-backend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-backend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-backend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-backend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-backend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-backend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-backend)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-backend&metric=coverage)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-backend)<br>

Frontend:<br>
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-frontend&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-frontend)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-frontend&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-frontend)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-frontend&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-frontend)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=claudiadreifke_Capstone-KPIBoard-frontend&metric=bugs)](https://sonarcloud.io/summary/new_code?id=claudiadreifke_Capstone-KPIBoard-frontend)

## Project status
The application is under construction

## Installation
- Open project in an IDE of your choice <br>
- Run `npm install` in frontend folder <br>
- Allow installation of backend packages (if needed)<br>
- Start backend application<br>
- Start frontend application (with start-button in package.json)<br>
- Open http://localhost:3000 in a browser of your choice <br>
The registration for new users is located inside the application to avoid misuse and unauthorized access. To start the application for the first time an admin-user must be stored in the MongoDB beforehand:<br>
- Open MongoDB-Compass and connect to mongodb://localhost:27017<br>
- Create a database named "kpiBoard"<br>
- Create a collection named "appUser"<br>
- Create an admin user as follows:<br>
![Bildschirmfoto 2022-09-14 um 11 53 35](https://user-images.githubusercontent.com/108395674/190124934-480ac3d3-c809-4703-8ee5-18744ec25963.png)<br>
For password-hashing you can use e.g. https://bcrypt-generator.com/<br>
- Login with username and password (not passwordHash) and have fun collecting KPIs 🚥<br>

By the way: It's build as desktop application, due to the size of the KPI-Board. So don't open it on a mobile/tablet, it won't fit the screen 😀
