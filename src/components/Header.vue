<template>
    <ul class="nav nav-pills">
      <router-link to="/" tag="li" active-class="active" exact><a>Home</a></router-link>
      <router-link to="/login" tag="li" active-class="active"><a>Login</a></router-link>
      <router-link to="/addSync" tag="li" active-class="active"><a>Add sync</a></router-link>
      <router-link to="/mySync" tag="li" active-class="active"><a>My sync</a></router-link>
      <router-link to="/admin" tag="li" active-class="active"><a>Admin</a></router-link>
      <router-link to="/logout" tag="li" active-class="active"><a>Logout</a></router-link>
    </ul>
</template>
