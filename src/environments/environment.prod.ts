export const environment = {
<<<<<<< HEAD
  debounceTime:500,
  server:'/api/',
  production: true
=======
  production: true,
  debounceTime:500,
  server:'/cloudapi/'
>>>>>>> 64cf5e2f25226588b50a3600bfd7ac5c14939cb6
};

export const PersonAPIConfig = {
  userImagePattern:`https://m.digitalchina.com/DCMobile2/HeadImage/{{userEN}}_middle.jpg?OpenId=3.1415926&SysType=m`,
  searchUrlPattern:environment.server+"persons?search_LIKE_name_1={{search_key}}&search_LIKE_itcode_2={{search_key}}&formula=1 OR 2&pageSize=40"
}

