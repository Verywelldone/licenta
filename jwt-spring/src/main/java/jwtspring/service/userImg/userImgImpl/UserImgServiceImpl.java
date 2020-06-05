package jwtspring.service.userImg.userImgImpl;

import jwtspring.models.user.User;
import jwtspring.models.user.UserProfileImage;
import jwtspring.payload.response.MessageResponse;
import jwtspring.repository.ImageRepository;
import jwtspring.repository.UserRepository;
import jwtspring.service.userImg.UserImgService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
public class UserImgServiceImpl implements UserImgService {

    @Autowired
    ImageRepository imageRepository;

    @Autowired
    UserRepository userRepository;


    public ResponseEntity uplaodImage(@RequestParam("imageFile") MultipartFile file, @RequestParam("userId") int userid) throws IOException {

        System.out.println("USER ID IS " + userid);
        User currentUser = userRepository.findUserById(userid);

        System.out.println("Original Image Byte Size - " + file.getBytes().length);
        UserProfileImage img = new UserProfileImage(file.getOriginalFilename(), file.getContentType(),
                compressBytes(file.getBytes()));

        currentUser.getUserDetails().setProfileImage(img);
        imageRepository.save(img);

        return ResponseEntity.ok(new MessageResponse(" UPLOADED "));
    }


    public UserProfileImage getImage(int userImgId) {
        final UserProfileImage retrievedImage = userRepository.findUserById(userImgId).getUserDetails().getProfileImage();

        UserProfileImage img = new UserProfileImage(
                retrievedImage.getName(),
                retrievedImage.getType(),
                decompressBytes(retrievedImage.getPicByte()));
        return img;
    }


    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[2048];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }


    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }
}
