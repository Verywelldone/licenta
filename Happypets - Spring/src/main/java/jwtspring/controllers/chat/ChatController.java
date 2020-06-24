//package jwtspring.controllers.chat;
//
//import jwtspring.models.DTO.ConversationDTO.ConversationDTO;
//import jwtspring.models.chat.Conversation;
//import jwtspring.models.user.User;
//import jwtspring.service.chat.ConversationService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Set;
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "*", maxAge = 3600)
//@RequestMapping("/chat")
//public class ChatController {
//
//    @Autowired
//    ConversationService conversationService;
//
//    @PostMapping("/send")
//    public String sendMessage(@RequestBody ConversationDTO message) {
//        return conversationService.getConversation(message);
//    }
//
//    @GetMapping("/chat")
//    public List<Conversation> getAllUserMessages(@RequestParam(name = "senderId") int senderId, @RequestParam(name = "reciverId") int reciverId) {
//        return this.conversationService.getAllConversations(senderId, reciverId);
//    }
//
////    @GetMapping("/get-active/{userId}")
////    public List<User> getActiveChats(@PathVariable(value = "userId") int userId){
////        return this.conversationService.getActiveChats(userId);
////    }
//}
