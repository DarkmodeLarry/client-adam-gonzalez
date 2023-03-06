import firestoreDatabase from '../firebaseConfig'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

import CryptoJS from 'crypto-js'

export const CreateUser = async (payload) => {
  try {
    // Check if user already exists using email
    const qry = query(collection(firestoreDatabase, 'users'), where('email', '==', payload.email))
    const querySnapshot = await getDocs(qry)
    if (querySnapshot.size > 0) {
      throw new Error('User already exists')
    }
    // hash password
    const hashedPassword = CryptoJS.AES.encrypt(payload.password, 'adam-swimcoach').toString()
    payload.password = hashedPassword
    // create user

    const docRef = collection(firestoreDatabase, 'users')
    const doc = await addDoc(docRef, payload)

    return {
      success: true,
      message: 'User created successfully'
    }
  } catch (error) {
    return error
  }
}

// Path: src/pages/register/index.js

export const LoginUser = async (payload) => {
  try {
    const qry = query(collection(firestoreDatabase, 'users'), where('email', '==', payload.email))
    const querySnapshots = await getDocs(qry)
    if (querySnapshots.size === 0) {
      throw new Error('User does not exist')
    }
    // decrypt password
    const decryptedPassword = CryptoJS.AES.decrypt(
      querySnapshots.docs[0].data().password,
      'adam-swimcoach'
    ).toString(CryptoJS.enc.Utf8)

    if (decryptedPassword !== payload.password) {
      throw new Error('Incorrect password')
    }

    return {
      success: true,
      message: 'User logged in successfully',
      data: user
    }
  } catch (error) {
    return error
  }
}
