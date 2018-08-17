# SYSDM

## ER Diagram
![ER Diagram](https://bitbucket.org/qd16/sysdm/raw/0b215780df86df01d881e9b906b4e9bbdbe4a50e/db_model/ER-diagram2.png =400x2)


### To start REST API server:

```

	npm install
	npm run dev

	http://localhost:3000/api/vendors
```


### To test front-end:

	1. Go to ./www directory (put all frond-end stuff inside this folder)

```
	cd www
```


	2. Project setup
```
	npm install
```


	3. Compiles and hot-reloads in development mode
```
	npm run serve
```


	4. Open browser
```
	http://localhost:8081/
```

The componet is here(`./www/src/components/VendorList.vue`). Need to have `Vetur` extension on VSCode to get syntex highlighting.

The familiar syntex such as: `{{ object }}`, `v-for=:"item in array"`, `v-if:=""` etc. are generally much simpler and more consistant than jsp+el+jstl.