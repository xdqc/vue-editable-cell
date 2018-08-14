create table customer
(
	id int auto_increment
		primary key,
	name varchar(128) not null,
	phone varchar(16) null,
	email varchar(128) null,
	street varchar(64) not null,
	city varchar(16) not null,
	postcode int null,
	constraint customer_id_uindex
		unique (id)
)
engine=InnoDB
;

create table driver
(
	id int auto_increment
		primary key,
	name varchar(128) not null,
	phone varchar(16) null,
	email varchar(128) null,
	constraint driver_id_uindex
		unique (id)
)
engine=InnoDB
;

create table product
(
	id int auto_increment
		primary key,
	name varchar(128) not null,
	volume int null,
	expiry_date datetime null,
	vendor_id int not null,
	task_id int null,
	instock tinyint(1) default '1' not null,
	constraint Product_id_uindex
		unique (id)
)
engine=InnoDB
;

create index product_vendor_id_fk
	on product (vendor_id)
;

create index product_task_id_fk
	on product (task_id)
;

create table storage
(
	id int auto_increment
		primary key,
	name varchar(128) not null,
	capacity int not null,
	street varchar(64) null,
	city varchar(16) null,
	postcode int null,
	constraint storage_id_uindex
		unique (id)
)
engine=InnoDB
;

create table task
(
	id int auto_increment
		primary key,
	customer_id int not null,
	driver_id int not null,
	bulk int null,
	reqest_date datetime null,
	start_date datetime null,
	end_date datetime null,
	status tinyint(1) default '0' null,
	note varchar(256) null,
	constraint task_id_uindex
		unique (id),
	constraint task_customer_id_fk
		foreign key (customer_id) references customer (id)
			on update cascade,
	constraint task_driver_id_fk
		foreign key (driver_id) references driver (id)
			on update cascade
)
engine=InnoDB
;

create index task_customer_id_fk
	on task (customer_id)
;

create index task_driver_id_fk
	on task (driver_id)
;

alter table product
	add constraint product_task_id_fk
		foreign key (task_id) references task (id)
;

create table vendor
(
	id int auto_increment
		primary key,
	name varchar(128) not null,
	type varchar(64) null,
	constraint vendor_id_uindex
		unique (id)
)
engine=InnoDB
;

alter table product
	add constraint product_vendor_id_fk
		foreign key (vendor_id) references vendor (id)
;

