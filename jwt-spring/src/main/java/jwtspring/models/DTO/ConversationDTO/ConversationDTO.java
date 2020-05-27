package jwtspring.models.DTO.ConversationDTO;

public class ConversationDTO {

    private int senderUser;

    private int reciverUser;

    private String message;

    public int getSenderUser() {
        return senderUser;
    }

    public void setSenderUser(int senderUser) {
        this.senderUser = senderUser;
    }

    public int getReciverUser() {
        return reciverUser;
    }

    public void setReciverUser(int reciverUser) {
        this.reciverUser = reciverUser;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
