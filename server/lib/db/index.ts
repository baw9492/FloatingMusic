import {MongoClient} from 'mongodb';
const uri = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);
const database = client.db('FloatingMusic');
export const songlists = database.collection<any>('songlist');
export const songs = database.collection<any>('songs');
