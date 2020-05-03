package jwtspring.controllers;

import jwtspring.models.User;
import jwtspring.models.UserDetails;
import jwtspring.models.UserProfileImage;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.ImageRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.userImg.UserImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "image")
public class ImageUploadController {

    @Autowired
    UserImgService userImgService;


    @PostMapping("/upload")
    public ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("userId") long userid) throws IOException {
        return userImgService.uplaodImage(file, userid);
    }


    @GetMapping(path = {"/get/{userImageId}"})
    public UserProfileImage getImage(@PathVariable("userImageId") int userImgId) throws IOException {
        return userImgService.getImage(userImgId);
    }

}