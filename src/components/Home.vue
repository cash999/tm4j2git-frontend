<template>

    <div>
      <router-view/>
      <p>The TM4J2GIT tool can be used to synchronize BDD feature files from a specific JIRA Project with activated TM4J Test management to a target GIT repository.</p>
      <p>TM4J2GIT allows to synchronize from one or several JIRA TM4J projects in GIT repositories.</p>
    </div>
</template>

<script>
  import { bus } from '../main';
  export default {
    created() {
      bus.$emit('loggedOut');
    }
  }
</script>
