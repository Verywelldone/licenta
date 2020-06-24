//package jwtspring.models.chat;
//
//
//import jwtspring.models.service.HostService;
//import jwtspring.models.user.User;
//
//import javax.persistence.*;
//import java.sql.Timestamp;
//
//@Table
//@Entity
//public class Conversation {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int chatId;
//
//    private Timestamp timestamp;
//
//    @ManyToOne
//    @JoinColumn(name = "user_senderId", nullable = false)
//    private User sender;
//
//    @ManyToOne
//    @JoinColumn(name = "user_reciverId", nullable = false)
//    private User reciver;
//
//    private String message;
//
//    private EMessageStatus messageStatus;
//
//
//    public Conversation() {
//        this.messageStatus = EMessageStatus.SENT;
//    }
//
//
//    public Timestamp getTimestamp() {
//        return timestamp;
//    }
//
//    public void setTimestamp(Timestamp timestamp) {
//        this.timestamp = timestamp;
//    }
//
//    public void setSenderId(User senderId) {
//        this.sender = senderId;
//    }
//
//    public User getReciverId() {
//        return reciver;
//    }
//
//    public User getSenderId() {
//        return sender;
//    }
//
//    public void setReciverId(User reciverId) {
//        this.reciver = reciverId;
//    }
//
//    public String getMessage() {
//        return message;
//    }
//
//    public void setMessage(String message) {
//        this.message = message;
//    }
//
//    public EMessageStatus getMessageStatus() {
//        return messageStatus;
//    }
//
//    public void setMessageStatus(EMessageStatus messageStatus) {
//        this.messageStatus = messageStatus;
//    }
//}
