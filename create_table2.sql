create table public_dust (
  id int not null auto_increment primary key,
  seq int(10) unsigned,
  pm10 float(6,2),
  pm25 float(6,2),
  ip char(15),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP); 
