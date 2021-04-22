<h1>Chatty People</h1>

Chatty People is a Web Application that everyone can chat on a daily basis.


Table of Contents
---
1. Purpose of the Project
2. Used Tech
3. About the Project
4. Structure & Features
5. What I learned
6. Reference
---

**1. Purpose of the Project**
---
- Practice React Hook
- Firebase api and use Firebase to create Authentication
- Practice React Router

**2. Used Technology**
---
<div display="flex">
<img width="50" height="25" alt="Screen Shot 2021-04-21 at 8 17 01 PM" src="https://user-images.githubusercontent.com/49248131/115650884-f3b38500-a2de-11eb-9a0c-a3fedf8e3f60.png">
<img width="50" height="25" alt="Screen Shot 2021-04-21 at 8 19 02 PM" src="https://user-images.githubusercontent.com/49248131/115650918-075eeb80-a2df-11eb-8ea9-ec156636e3bf.png">
<img width="50" height="25" alt="Screen Shot 2021-04-21 at 8 23 45 PM" src="https://user-images.githubusercontent.com/49248131/115651164-82c09d00-a2df-11eb-94c0-6faf1175a592.png"> 
<img width="50" height="25" alt="Screen Shot 2021-04-21 at 8 24 51 PM" src="https://user-images.githubusercontent.com/49248131/115651243-a5eb4c80-a2df-11eb-86fe-d7a1a5a6b67e.png">
<img width="50" height="25" alt="Screen Shot 2021-04-21 at 8 29 48 PM" src="https://user-images.githubusercontent.com/49248131/115651622-6113e580-a2e0-11eb-8f32-18667019dd02.png">
</div>

**3. About the Project**
---
[DEMO LINK]()

#### 1. debugging : data collection from 'tweets' should match with your data id in Firebase --> IMPORTANT to know which collection you are saving the data.

#### 2. debugging : syntax from Tweet.js & Auth.js when input, you should put the onSubmit (e) => { e.preventDefault(); (target: {{value},} = e;

#### 3. update, delete or whatever changes happens in Snapshot\*\*\*

#### 4. setEditing(false); will update the browser after edit \*\*\*

#### SetUp : React + Firebase & Router Set Up

#### Authentication : Using Firebase Auth, Login Form & Creating Account & Social Login

#### npm i --save Firebase

# firebase.js --> const

# error : 'initializeapp' is not exported from 'firebase/app'

## debug : 만약 v8(2020년 10월 26일 출시)을 사용한다면 import \* as firebase from 'firebase/app' should be import firebase from 'firebase/app' instead.

# Absolute Imports in React

## jsconfig.json using compilerOptions

# preventDefault() function onSubmit prevent the re-rendering automatically. instead it order the function to be executed.

## npm i uuid : when you want to create a unique id.
