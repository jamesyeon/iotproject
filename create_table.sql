create table sensors_new (
  id int not null auto_increment primary key,
  seq int(10) unsigned,
  u decimal(10) unsigned,
  f char(1),
  s decimal(10) unsigned,
  t0 float(6,2),
  h0 float(6,2),
  c0 float(6,2),
  d0 float(6,2),
  d1 float(6,2),
  ip char(15),
  time TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
