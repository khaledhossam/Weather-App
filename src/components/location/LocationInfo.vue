<template>
  <div class="location__info">
    <h3>
      {{ LocationInfo.name }}
    </h3>
    <img :src="`http://openweathermap.org/img/w/${icon}.png`" />
  </div>
</template>
<script>
export default {
  name: 'LocationInfo',
  props: {
    icon: {
      type: String,
      default: () => '',
    },
    LocationInfo: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.location__info {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 2rem;
  color: #fff;
}
.location__info img {
  width: 2.5rem;
}
</style>
