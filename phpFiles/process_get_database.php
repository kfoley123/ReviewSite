<!-- PHP Script to Process GET Request (process_get.php) -->
<!DOCTYPE html>
<html>
<head>
    <title>GET Request Processing</title>
</head>
<body>
<?php
    $servername = "localhost";
    $username = "id21855242_kfoley";
    $password = "Welcome101!";
    $dbname = "id21855242_kortney";
    $name = $_GET['name'];
    $email = $_GET['email'];
    $message = $_GET['message'];
    try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // set the PDO error mode to exception
    $sth = $conn->prepare('INSERT INTO messages (name, message, email)
    VALUES (?, ?, ?)');
    $sth->bindParam(1, $name, PDO::PARAM_STR);
    $sth->bindParam(2, $message, PDO::PARAM_STR);
    $sth->bindParam(3, $email, PDO::PARAM_STR);
    $sth->execute();
    echo "New record created successfully";
    } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
    }

    $conn = null;
    ?>

</body>
</html>

