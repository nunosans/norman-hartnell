<?php
$to = "nuno@savantstudio.co.uk";
$subject = "New subscriber";
$email = $_REQUEST['email'];
$message = "A new email address has been submitted to your newsletter signup box: $email";
$headers = "From: notifications@normanhartnell.com";
$sent = mail($to, $subject, $message, $headers);

if($sent) {
	include("./success.html");
} else {
	include("./error.html");
}
?>
