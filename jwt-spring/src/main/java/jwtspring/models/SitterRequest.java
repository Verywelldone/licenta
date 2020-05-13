package jwtspring.models;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Set;

public class SitterRequest {

    private int userId;
    private String[] animalType;
    private String[] dogSizeArray;
    private ArrayList<ServiceArray> serviceArray;

    private String placeToLive;
    private String otherPets;

    @Override
    public String toString() {
        return "SitterRequest{" +
                "userId=" + userId +
                ", animalType='" + animalType + '\'' +
                ", dogSizeArray='" + dogSizeArray + '\'' +
                ", serviceArray=" + serviceArray +
                ", placeToLive='" + placeToLive + '\'' +
                ", otherPets='" + otherPets + '\'' +
                '}';
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String[] getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String[] animalType) {
        this.animalType = animalType;
    }

    public String[] getDogSizeArray() {
        return dogSizeArray;
    }

    public void setDogSizeArray(String[] dogSizeArray) {
        this.dogSizeArray = dogSizeArray;
    }

    public ArrayList<ServiceArray> getServiceArray() {
        return serviceArray;
    }

    public void setServiceArray(ArrayList<ServiceArray> serviceArray) {
        this.serviceArray = serviceArray;
    }

    public String getPlaceToLive() {
        return placeToLive;
    }

    public void setPlaceToLive(String placeToLive) {
        this.placeToLive = placeToLive;
    }

    public String getOtherPets() {
        return otherPets;
    }

    public void setOtherPets(String otherPets) {
        this.otherPets = otherPets;
    }
}
