package jwtspring.service.userImg;

import jwtspring.models.UserProfileImage;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public interface UserImgService {

    ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("userId") long userid) throws IOException;

    UserProfileImage getImage(int userImgId) throws IOException;
}
