import http from "./httpService";
import { apiUrl } from "../config.json";

export function addInstrument(instrument) {
    return http.post(`${apiUrl}/instruments`, instrument);
}

export function getInstrument(instrumentId) {
    return http.get(`${apiUrl}/instruments/${instrumentId}`)
}

export function editInstrument(instrument) {
    const instrumentId = instrument._id;
    delete instrument._id;
    return http.put(`${apiUrl}/instruments/${instrumentId}`, instrument);
}

export function deleteItem(itemId) {
    
    return http.delete(`${apiUrl}/instruments/${itemId}`);
}

export function getAllInstruments() {
    
    return http.get(`${apiUrl}/instruments`);
}

export function getFilteredInstruments(filter){
    return http.get(`${apiUrl}/instruments/search/${filter}`)
}





// eslint-disable-next-line import/no-anonymous-default-export
export default {
    addInstrument,
    getInstrument,
    editInstrument,
    deleteItem,
    getAllInstruments,
    getFilteredInstruments
};