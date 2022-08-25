import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc,
    updateDoc,
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDqBKfeFUjjWhnFBLSnn2mGo6w2pW-lXM0",
  authDomain: "fir-project-2022.firebaseapp.com",
  projectId: "fir-project-2022",
  storageBucket: "fir-project-2022.appspot.com",
  messagingSenderId: "815086810598",
  appId: "1:815086810598:web:a4eee0d5fe2168c55e9227"
}; 

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()

const auth = getAuth()

// collection ref
const colRef = collection(db, 'books')

//quering the deta
const q = query(colRef,orderBy('createdAt'))

// get collection data (on refershing the page )
// getDocs(colRef)
//   .then(snapshot => {
//     // console.log(snapshot.docs)
//     let books = []
//     snapshot.docs.forEach(doc => {
//       books.push({ ...doc.data(), id:  doc.id })
//     })
//     console.log(books)
//   })
//   .catch(err => {
//     console.log(err.message)
//   })

// get real time collection of  data without refershing the page
 const unsub = onSnapshot(q, (snapshot) => {
       let books = []
    snapshot.docs.forEach(doc => {
      books.push({ ...doc.data(), id: doc.id })
    })
     console.log(books)
 })


  // adding document
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        // we use name property from html to access this 
        title:addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt:serverTimestamp()
    })
        .then(() => {
        addBookForm.reset()
    })
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
   
    const docRef = doc(db,'books',deleteBookForm.id.value )
    deleteDoc(docRef)
        .then(() => {
        deleteBookForm.reset()
    })
})

// get a single document

const docRef = doc(db, 'books', 'KlsXY8eEwGE42uvklFDf')

// getDoc(docRef)
//     .then((doc) => {
//      console.log(doc.data(), doc.id)
//     })
 
const unsubDoc = onSnapshot(docRef, (doc) => {
    // console.log(doc.data(), doc.id)

})


// update a document

const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
   
    const docRef = doc(db, 'books', updateBookForm.id.value) 

    updateDoc(docRef, {
        title:'Discovery'
    })
        .then(() => {
        updateBookForm.reset
    })
})

// signup form

const signupForm = document.querySelector('.signup')

signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value


    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            console.log('user created', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })
})


// Login and Logout

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
       .then(() => {
         console.log('the user signed out')
        })
        .catch((err) => {
            console.log(err.message)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
         console.log('user logged in', cred.user)
        })
        .catch((err) => {
            console.log(err.message)
        })
})

// subscribing to auth changes

const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed', user)
})

// unsubscribing the event

const unsubbutton = document.querySelector('.unsub')
unsubbutton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsub()
    unsubDoc()
    unsubAuth()
 })
