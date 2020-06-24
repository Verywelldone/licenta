//package jwtspring.service.chat.chatImpl;
//
//
//import jwtspring.models.DTO.ConversationDTO.ConversationDTO;
//import jwtspring.models.chat.Conversation;
//import jwtspring.models.user.User;
//import jwtspring.repository.ConversationRepository;
//import jwtspring.repository.UserRepository;
//import jwtspring.service.chat.ConversationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//import org.springframework.web.bind.annotation.RequestParam;
//
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Date;
//import java.sql.Timestamp;
//import java.util.Set;
//
//
//@Service
//public class ConversationServiceImpl implements ConversationService {
//
//    @Autowired
//    UserRepository userRepository;
//
//    @Autowired
//    ConversationRepository conversationRepository;
//
//    @Override
//    public String getConversation(ConversationDTO message) {
//        Conversation conversation = new Conversation();
//        conversation.setSenderId(userRepository.findUserById(message.getSenderUser()));
//        conversation.setReciverId(userRepository.findUserById(message.getReciverUser()));
//        conversation.setMessage(message.getMessage());
//
//        Date date = new Date();
//        conversation.setTimestamp(new Timestamp(date.getTime()));
//
//        conversationRepository.save(conversation);
//        return conversation.toString();
//    }
//
//
//    @Override
//    public List<Conversation> getAllConversations(int senderId, int reciverId) {
//
//        User sender = userRepository.findUserById(senderId);
//        User reciver = userRepository.findUserById(reciverId);
//
//        return conversationRepository.findAllBySenderIdAndAndReciverId(sender, reciver);
//    }
//
////    @Override
////    public List<User> getActiveChats(int userId) {
////        User user = userRepository.findUserById(userId);
////        List<Conversation> conversationList = conversationRepository.findAllBySenderIdOrReciverId(user, user);
////        List<User> userList = new ArrayList<>();
////        conversationList.forEach(conversation -> {
////            if (conversation.getReciverId().getId() == userId)
////                userList.add(userRepository.findUserById(conversation.getSenderId().getId()));
////
////            if (conversation.getSenderId().getId() == userId)
////                userList.add(userRepository.findUserById(conversation.getReciverId().getId()));
////        });
////        return userList;
////    }
//}
