import { type PropType, defineComponent, h } from "vue"
import { base } from '../../env'

const Link = defineComponent({
  props: {
    to: String as PropType<string | null>
  },
  setup(props, context) {
    const _to = (base === '/' ? '' : base) + props.to

    return () => h(_to ? 'a' : 'span', _to ? { href: _to } : void 0, context.slots.default?.())
  }
})

export default Link