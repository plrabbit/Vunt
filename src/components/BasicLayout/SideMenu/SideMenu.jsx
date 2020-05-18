import Menu from 'ant-design-vue/es/menu'
import 'ant-design-vue/es/menu/style/index.less'
import Icon from 'ant-design-vue/es/icon'
import 'ant-design-vue/es/tooltip/style/index.less'

export default {
  name: 'SideMenu',
  props: {
    menu: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      openKeys: [],
      selectedKeys: [],
      cachedOpenKeys: []
    }
  },
  computed: {
    rootSubmenuKeys: vm => {
      const keys = []
      vm.menu.forEach(item => keys.push(item.path))
      return keys
    }
  },
  mounted () {
    this.updateMenu()
  },
  watch: {
    collapsed (val) {
      if (val) {
        this.cachedOpenKeys = this.openKeys.concat()
        this.openKeys = []
      } else {
        this.openKeys = this.cachedOpenKeys
      }
    },
    $route: function () {
      this.updateMenu()
    }
  },
  methods: {
    // select menu item
    onOpenChange (openKeys) {
      // 在水平模式下时执行，并且不再执行后续
      if (this.mode === 'horizontal') {
        this.openKeys = openKeys
        return
      }
      // 非水平模式时
      const latestOpenKey = openKeys.find(key => !this.openKeys.includes(key))
      if (!this.rootSubmenuKeys.includes(latestOpenKey)) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    onSelect (event) {
      const { item, key, selectedKeys } = event
      // 0 means controlled by project router
      if (key.startsWith('0')) {
        this.selectedKeys = selectedKeys
        this.$emit('select', { item, key, selectedKeys })
      }
    },
    updateMenu () {
      const currentPath = '0|' + this.$route.path
      let parentPath = currentPath.match(/(\/\w+)\/.+$/)
      if (parentPath) {
        parentPath = parentPath[1]
      }
      this.selectedKeys = [currentPath]
      const openKeys = []
      if (this.mode === 'inline') {
        parentPath && openKeys.push(parentPath)
      }

      this.collapsed ? (this.cachedOpenKeys = openKeys) : (this.openKeys = openKeys)
    },

    // render
    renderItem (menu) {
      if (menu.type === 0) {
        return menu.children ? this.renderSubMenu(menu) : this.renderMenuItem(menu)
      } else {
        return this.renderMenuItem(menu)
      }
    },
    renderMenuItem (menu) {
      const CustomTag = menu.type === 0 ? 'router-link' : 'a'
      const props = { to: menu.path }
      // const attrs = { href: menu.path, target: menu.meta && menu.meta.target }
      const attrs = { href: menu.path }
      if (CustomTag === 'a') attrs.target = '_blank'

      return (
        <Menu.Item {...{ key: `${menu.type}|${menu.path}` }}>
          <CustomTag {...{ props, attrs }}>
            {this.renderIcon(menu.icon)}
            <span>{menu.text}</span>
          </CustomTag>
        </Menu.Item>
      )
    },
    renderSubMenu (menu) {
      const itemArr = []
      menu.children.forEach(item => itemArr.push(this.renderItem(item)))
      return (
        <Menu.SubMenu {...{ key: menu.path }}>
          <span slot="title">
            {this.renderIcon(menu.icon)}
            <span>{menu.text}</span>
          </span>
          {itemArr}
        </Menu.SubMenu>
      )
    },
    renderIcon (icon) {
      if (icon === 'none' || icon === undefined || /^\s*$/.test(icon)) {
        return null
      }
      const props = {}
      typeof (icon) === 'object' ? props.component = icon : props.type = icon
      return (
        <Icon {...{ props }}/>
      )
    }
  },

  render () {
    const dynamicProps = {
      props: {
        mode: this.mode,
        theme: this.theme,
        openKeys: this.openKeys,
        selectedKeys: this.selectedKeys
      },
      on: {
        openChange: this.onOpenChange,
        select: this.onSelect
      }
    }

    if (this.mode === 'inline') {
      dynamicProps.props.inlineCollapsed = this.collapsed
    }

    const menuTree = this.menu.map(item => {
      return this.renderItem(item)
    })

    return (<Menu {...dynamicProps}>{menuTree}</Menu>)
  }
}
