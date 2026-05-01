import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Box, Button, CircularProgress, Grid } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import bg from '../assets/shop2.png'
import ajaxService from '../services/ajax-service'
import { CATEGORIES } from '../constants'
import { Hero, BrandBanner, AddToCartModal } from '../components'
import ProductGrid from '../components/Products/ProductGrid'
import ProductList from '../components/Products/ProductList'
import ProductSidebar from '../components/Products/ProductSidebar'
import DealsSidebar from '../components/Products/DealsSidebar'
import ProductFilters from '../components/Products/ProductFilters'
import ProductLoadingSkeleton from '../components/Products/ProductLoadingSkeleton'
import ProductControls from '../components/Products/ProductControls'
import { useTranslation } from 'react-i18next'
import { createSlug, getCategoryName } from '../utils'
import SEO from '../components/SEO'
import { SITE_URL } from '../constants'
import {
  CATEGORY_SEO_MAP,
  BRAND_SEO_MAP,
  DEALS_SEO_MAP,
  normalizeSeoKey
} from '../constants/seoMeta'
import DeliveryTags from '../components/Product/DeliveryTags'
import RecentlyView from '../components/RecentlyView'

const ProductsPage = ({ pageType }) => {
  const navigate = useNavigate()
  const { parentSlug, childSlug, subChildSlug, brandSlug, dealSlug } = useParams()
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user') ?? null
  const { t, i18n } = useTranslation()

  // Determine page type flags
  const isCategories = pageType === 'categories'
  const isBrands = pageType === 'brands'
  const isDeals = pageType === 'deals'

  // State management
  const [parentID, setParentID] = useState(null)
  const [childID, setChildID] = useState(null)
  const [subChildID, setSubChildID] = useState(null)
  const [brandID, setBrandID] = useState(null)
  const [dealType, setDealType] = useState(null)

  const [sortOn, setSortOn] = useState(false)
  const [sortingOn, setSortingOn] = useState(false)
  const [productsLoading, setProductsLoading] = useState(true)
  const [sidebarLoading, setSidebarLoading] = useState(true)

  const [sideItems, setSideItems] = useState([])
  const [products, setProducts] = useState([])
  const [offset, setOffset] = useState(0)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isGridView, setIsGridView] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 640
    }
    return true
  })
  const [sortOption, setSortOption] = useState(null)

  const [priceSortText, setPriceSortText] = useState('Sort By Price')
  const [alphaSortText, setAlphaSortText] = useState('Sort By Alphabet')

  const [cartModal, setCartModal] = useState(false)
  const [modalProduct, setModalProduct] = useState({})
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [heroTitle, setHeroTitle] = useState(
    isCategories ? 'Categories' : isBrands ? 'Brands' : 'Deals'
  )
  const [expandedItems, setExpandedItems] = useState({})

  // ── Brands filter state (new) ──
  const [brands, setBrands] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])

  // Dynamic title based on page type (for sidebar)
  const Title = useMemo(() => {
    if (isCategories) return t('categories_title')
    if (isBrands) return t('brands_title')
    return t('deals_title')
  }, [isCategories, isBrands, t])

  // Translated hero title for correct language (ar/ur)
  const displayHeroTitle = useMemo(() => {
    if (heroTitle === 'Categories') return t('categories_title')
    if (heroTitle === 'Brands') return t('brands_title')
    if (heroTitle === 'Deals') return t('deals_title')

    const findByName = (items, name) => {
      for (const item of items) {
        if (item.name === name) return item
        if (item.childrens?.length > 0) {
          const found = findByName(item.childrens, name)
          if (found) return found
        }
      }
      return null
    }

    const foundItem = findByName(sideItems, heroTitle)
    return foundItem ? getCategoryName(foundItem, i18n.language) : heroTitle
  }, [heroTitle, t, sideItems, i18n.language])

  const handleModalClick = (e, product) => {
    e.stopPropagation()
    setCartModal(true)
    setModalProduct(product)
  }

  const toggleExpand = id => {
    setExpandedItems(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  // ── Brand toggle handler (new) ──
  const handleBrandToggle = useCallback((brandId) => {
    setSelectedBrands(prev =>
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }, [])

  // Navigation handlers - different for each page type
  const handleParentClick = useCallback(
    (id, title = null, slug = null) => {
      setHeroTitle(title || (isCategories ? 'Categories' : isBrands ? 'Brands' : 'Deals'))
      const itemSlug = slug || (title ? createSlug(title) : '')
      
      if (isCategories) {
        if (id > 0) {
          navigate(`/category/${itemSlug}`)
        } else {
          navigate('/category')
        }
      } else if (isBrands) {
        navigate(`/brand/${itemSlug}`)
      } else if (isDeals) {
        navigate(`/deals/${itemSlug}`)
      }
    },
    [navigate, isCategories, isBrands, isDeals]
  )

  const handleChildClick = useCallback(
    (parentId, id, title = null, parentSlugValue = null, childSlugValue = null, brandOrDealSlug = null) => {
      setHeroTitle(title || 'Categories')
      
      if (isCategories) {
        const parentSlugToUse = parentSlugValue || parentSlug
        const childSlugToUse = childSlugValue || createSlug(title)
        navigate(`/category/${parentSlugToUse}/${childSlugToUse}`)
      } else if (isDeals) {
        const categorySlug = childSlugValue || createSlug(title)
        const dealSlugToUse = brandOrDealSlug || dealSlug
        navigate(`/deals/${dealSlugToUse}/${categorySlug}`)
      } else if (isBrands) {
        const categorySlug = childSlugValue || createSlug(title)
        const brandSlugToUse = brandOrDealSlug || brandSlug
        navigate(`/brand/${brandSlugToUse}/${categorySlug}`)
      }
    },
    [navigate, parentSlug, dealSlug, brandSlug, isCategories, isBrands, isDeals]
  )

  const handleSubChildClick = useCallback(
    (parentId, childId, id, title = null, parentSlugValue = null, childSlugValue = null, subChildSlugValue = null, brandOrDealSlug = null) => {
      setHeroTitle(title || 'Categories')
      
      if (isCategories) {
        const parentSlugToUse = parentSlugValue || parentSlug
        const childSlugToUse = childSlugValue || childSlug
        const subChildSlugToUse = subChildSlugValue || createSlug(title)
        navigate(`/category/${parentSlugToUse}/${childSlugToUse}/${subChildSlugToUse}`)
      } else if (isDeals) {
        const parentCategorySlug = parentSlugValue || parentSlug
        const childCategorySlug = childSlugValue || childSlug
        const dealSlugToUse = brandOrDealSlug || dealSlug
        
        if (subChildSlugValue) {
          navigate(`/deals/${dealSlugToUse}/${parentCategorySlug}/${childCategorySlug}/${subChildSlugValue}`)
        } else {
          navigate(`/deals/${dealSlugToUse}/${parentCategorySlug}/${childCategorySlug}`)
        }
      } else if (isBrands) {
        const parentCategorySlug = parentSlugValue || parentSlug
        const childCategorySlug = childSlugValue || childSlug
        const brandSlugToUse = brandOrDealSlug || brandSlug
        
        if (subChildSlugValue) {
          navigate(`/brand/${brandSlugToUse}/${parentCategorySlug}/${childCategorySlug}/${subChildSlugValue}`)
        } else {
          navigate(`/brand/${brandSlugToUse}/${parentCategorySlug}/${childCategorySlug}`)
        }
      }
    },
    [navigate, parentSlug, childSlug, dealSlug, brandSlug, isCategories, isBrands, isDeals]
  )

  // Data loading functions
  const loadCategories = useCallback(async () => {
    const response = await ajaxService.get('/all-categories')
    if (response.success) {
      let data = response.data
      const updatedCategories = [{ id: 0, name: t("side_categories.view_all"), slug: 'all' }, ...data]

      let foundParentID = null
      let foundChildID = null
      let foundSubChildID = null

      const categoriesList = updatedCategories.map(i => {
        const itemSlug = i.slug || createSlug(i.name)
        const isParentActive = parentSlug ? itemSlug === parentSlug : i.id === 0
        i.active = isParentActive
        
        if (isParentActive && i.id > 0) {
          foundParentID = i.id
        }

        if (i.childrens) {
          i.childrens.map(c => {
            const childItemSlug = c.slug || createSlug(c.name)
            c.active = childSlug ? childItemSlug === childSlug : false
            
            if (c.active) {
              foundChildID = c.id
              foundParentID = i.id
            }

            if (c.childrens) {
              c.childrens.map(x => {
                const subChildItemSlug = x.slug || createSlug(x.name)
                x.active = subChildSlug ? subChildItemSlug === subChildSlug : false
                
                if (x.active) {
                  foundSubChildID = x.id
                  foundChildID = c.id
                  foundParentID = i.id
                }
                return x
              })
            }
            return c
          })
        }
        return i
      })

      setParentID(foundParentID)
      setChildID(foundChildID)
      setSubChildID(foundSubChildID)
      
      setSidebarLoading(false)
      setSideItems(categoriesList)
    }
  }, [parentSlug, childSlug, subChildSlug])

  // ── Load brands list for the filter section (new) ──
  const loadBrandsList = useCallback(async () => {
    const { success, data } = await ajaxService.get('/all-brands')
    if (success) {
      setBrands(data.map(b => ({ id: b.id, name: b.name })))
    }
  }, [])

  const loadBrands = useCallback(async () => {
    const { success, data } = await ajaxService.get('/all-brands')
    if (success) {
      let foundBrandID = null
      let foundParentID = null
      let foundChildID = null
      let foundSubChildID = null

      const formattedData = data.map((brand, brandIndex) => {
        const itemSlug = brand.slug || createSlug(brand.name)
        brand.active = brandSlug ? itemSlug === brandSlug : false
        brand.expandId = brand.id ? `brand-${brand.id}` : `brand-idx-${brandIndex}`
        
        if (brand.active) {
          foundBrandID = brand.id
        }

        if (brand.categories && brand.categories.length > 0) {
          brand.childrens = brand.categories.map(category => {
            const categorySlug = category.slug || createSlug(category.name)
            const uniqueCategoryId = `${itemSlug}-${category.id}`
            const categoryData = { 
              ...category, 
              active: false,
              uniqueId: uniqueCategoryId,
              id: category.id
            }

            if (brand.active && parentSlug && categorySlug === parentSlug) {
              categoryData.active = true
              foundParentID = category.id
            }

            if (category.children && category.children.length > 0) {
              categoryData.childrens = category.children.map(child => {
                const childSlugValue = child.slug || createSlug(child.name)
                const uniqueChildId = `${uniqueCategoryId}-${child.id}`
                const childData = { 
                  ...child, 
                  active: false,
                  uniqueId: uniqueChildId,
                  id: child.id
                }

                if (brand.active && categoryData.active && childSlug && childSlugValue === childSlug) {
                  childData.active = true
                  foundChildID = child.id
                }

                if (child.subchildren && child.subchildren.length > 0) {
                  childData.childrens = child.subchildren.map(subchild => {
                    const subchildSlugValue = subchild.slug || createSlug(subchild.name)
                    const uniqueSubchildId = `${uniqueChildId}-${subchild.id}`
                    const subchildData = { 
                      ...subchild, 
                      active: false,
                      uniqueId: uniqueSubchildId,
                      id: subchild.id
                    }

                    if (brand.active && childData.active && subChildSlug && subchildSlugValue === subChildSlug) {
                      subchildData.active = true
                      foundSubChildID = subchild.id
                    }

                    return subchildData
                  })
                }

                return childData
              })
            }

            return categoryData
          })
        }

        return brand
      })

      setBrandID(foundBrandID)
      setParentID(foundParentID)
      setChildID(foundChildID)
      setSubChildID(foundSubChildID)
      setSidebarLoading(false)
      setSideItems(formattedData)
    }
  }, [brandSlug, parentSlug, childSlug, subChildSlug])

  const loadDeals = useCallback(async () => {
    const { success, data } = await ajaxService.get('/all-deals')
    if (success) {
      let foundType = null
      let foundParentID = null
      let foundChildID = null
      let foundSubChildID = null

      const formattedData = data.map((deal, dealIndex) => {
        const itemSlug = deal.slug || createSlug(deal.name)
        deal.active = dealSlug ? itemSlug === dealSlug : false
        deal.expandId = deal.id ? `deal-${deal.id}` : `deal-idx-${dealIndex}`
        
        if (deal.active) {
          foundType = deal.slug
        }

        if (deal.categories && deal.categories.length > 0) {
          deal.childrens = deal.categories.map(category => {
            const categorySlug = category.slug || createSlug(category.name)
            const uniqueCategoryId = `${deal.slug}-${category.id}`
            const categoryData = { 
              ...category, 
              active: false,
              uniqueId: uniqueCategoryId,
              id: category.id
            }

            if (deal.active && parentSlug && categorySlug === parentSlug) {
              categoryData.active = true
              foundParentID = category.id
            }

            if (category.children && category.children.length > 0) {
              categoryData.childrens = category.children.map(child => {
                const childSlugValue = child.slug || createSlug(child.name)
                const uniqueChildId = `${uniqueCategoryId}-${child.id}`
                const childData = { 
                  ...child, 
                  active: false,
                  uniqueId: uniqueChildId,
                  id: child.id
                }

                if (deal.active && categoryData.active && childSlug && childSlugValue === childSlug) {
                  childData.active = true
                  foundChildID = child.id
                }

                if (child.subchildren && child.subchildren.length > 0) {
                  childData.childrens = child.subchildren.map(subchild => {
                    const subchildSlugValue = subchild.slug || createSlug(subchild.name)
                    const uniqueSubchildId = `${uniqueChildId}-${subchild.id}`
                    const subchildData = { 
                      ...subchild, 
                      active: false,
                      uniqueId: uniqueSubchildId,
                      id: subchild.id
                    }

                    if (deal.active && childData.active && subChildSlug && subchildSlugValue === subChildSlug) {
                      subchildData.active = true
                      foundSubChildID = subchild.id
                    }

                    return subchildData
                  })
                }

                return childData
              })
            }

            return categoryData
          })
        }

        return deal
      })

      setDealType(foundType)
      setParentID(foundParentID)
      setChildID(foundChildID)
      setSubChildID(foundSubChildID)
      setSidebarLoading(false)
      setSideItems(formattedData)
    }
  }, [dealSlug, parentSlug, childSlug, subChildSlug])

  // Product fetching
  const fetchProducts = useCallback(
    async (updatedOffset = 0) => {
      let type = CATEGORIES.ALL
      let id = 0

      if (isCategories) {
        if (subChildID) {
          type = CATEGORIES.SUB_CHILD
          id = subChildID
        } else if (childID) {
          type = CATEGORIES.CHILD
          id = childID
        } else if (parentID) {
          type = CATEGORIES.PARENT
          id = parentID
        }
      } else if (isDeals || isBrands) {
        if (subChildID) {
          type = CATEGORIES.SUB_CHILD
          id = subChildID
        } else if (childID) {
          type = CATEGORIES.CHILD
          id = childID
        } else if (parentID) {
          type = CATEGORIES.PARENT
          id = parentID
        }
      }

      const queryParams = new URLSearchParams({
        category_id: id,
        type: type,
        offset: updatedOffset,
        limit: 20,
        brand_id: isBrands ? (brandID ?? 0) : 0,
        // ── pass selected brand IDs for filtering (new) ──
        brand_ids: selectedBrands.join(','),
        new_arrival: false
      })

      if (isDeals && dealType) {
        queryParams.append('product_type', dealType)
      }

      if (token && user) {
        queryParams.append('user_id', JSON.parse(user).id)
      }

      const url = `/category/products?${queryParams.toString()}`
      const response = await ajaxService.get(url)
      return response || null
    },
    // ── added selectedBrands to deps (new) ──
    [subChildID, childID, parentID, brandID, dealType, token, user, isCategories, isBrands, isDeals, selectedBrands]
  )

  const handleLoadMoreClick = useCallback(async () => {
    const updatedOffset = offset + 20
    setOffset(updatedOffset)
    setLoading(true)

    const response = await fetchProducts(updatedOffset)

    if (response) {
      setLoading(false)
      setProductsLoading(false)
      setProducts(prevProducts => [...prevProducts, ...response.data])
    }
  }, [offset, fetchProducts])

  const loadProducts = useCallback(async () => {
    setOffset(0)
    const response = await fetchProducts()

    if (response) {
      setCount(response.count)
      setProductsLoading(false)
      setProducts(response.data)
    }
  }, [fetchProducts])

  const handleSortOptionChange = useCallback(
    option => {
      setSortOption(option)
      setProductsLoading(true)
      setProducts([])
      setOffset(0)
      loadProducts()

      if (option === 3) {
        setPriceSortText('Sort By Low to High')
      } else if (option === 4) {
        setPriceSortText('Sort By High to Low')
      } else if (option === 1) {
        setAlphaSortText('Sort By A to Z')
      } else if (option === 2) {
        setAlphaSortText('Sort By Z to A')
      }
    },
    [loadProducts]
  )

  // Load sidebar data based on page type
  useEffect(() => {
    setOffset(0)
    setProductsLoading(true)
    setProducts([])
    
    if (isCategories) {
      loadCategories()
      loadBrandsList() // ── fetch brands list for filter (new) ──
    } else if (isBrands) {
      loadBrands()
    } else if (isDeals) {
      loadDeals()
    }
  }, [
    parentSlug,
    childSlug,
    subChildSlug,
    brandSlug,
    dealSlug,
    sortOption,
    isCategories,
    isBrands,
    isDeals,
    loadCategories,
    loadBrands,
    loadDeals,
    loadBrandsList, // ── added (new) ──
  ])

  // Re-fetch products when selectedBrands changes (new)
  useEffect(() => {
    if (!sidebarLoading && isCategories) {
      setOffset(0)
      setProductsLoading(true)
      setProducts([])
      loadProducts()
    }
  }, [selectedBrands]) // eslint-disable-line react-hooks/exhaustive-deps

  // Load products when IDs are available
  useEffect(() => {
    if (!sidebarLoading) {
      if (isBrands && brandID) {
        loadProducts()
      } else if (isDeals && dealType) {
        loadProducts()
      } else if (isCategories && parentID !== undefined) {
        loadProducts()
      }
    }
  }, [parentID, childID, subChildID, brandID, dealType, sidebarLoading, loadProducts, isCategories, isBrands, isDeals])

  // Expand sidebar items
  useEffect(() => {
    if (parentID) toggleExpand(parentID)
    if (childID) toggleExpand(childID)
    if (subChildID) toggleExpand(subChildID)
  }, [])

  // Auto-expand active deal/brand when deals/brands page loads
  useEffect(() => {
    if ((isDeals || isBrands) && sideItems.length > 0 && !sidebarLoading) {
      const activeItem = sideItems.find(item => item.active)
      
      sideItems.forEach(item => {
        if (item !== activeItem && (item.expandId || item.id)) {
          const itemId = item.expandId || item.id
          if (expandedItems[itemId]) {
            toggleExpand(itemId)
          }
        }
      })
      
      if (activeItem && (activeItem.expandId || activeItem.id)) {
        const activeItemId = activeItem.expandId || activeItem.id
        if (!expandedItems[activeItemId]) {
          toggleExpand(activeItemId)
        }
        
        if (activeItem.childrens) {
          const activeParent = activeItem.childrens.find(cat => cat.active)
          if (activeParent && activeParent.uniqueId) {
            if (!expandedItems[activeParent.uniqueId]) {
              toggleExpand(activeParent.uniqueId)
            }
            
            if (activeParent.childrens) {
              const activeChild = activeParent.childrens.find(child => child.active)
              if (activeChild && activeChild.uniqueId) {
                if (!expandedItems[activeChild.uniqueId]) {
                  toggleExpand(activeChild.uniqueId)
                }
              }
            }
          }
        }
      }
    }
  }, [sideItems, sidebarLoading, isDeals, isBrands, brandSlug, dealSlug, parentSlug, childSlug, subChildSlug])

  // Update hero title based on active item
  useEffect(() => {
    if (sidebarLoading) return

    if (isDeals && dealSlug) {
      const deal = sideItems.find(item => {
        const itemSlug = item.slug || createSlug(item.name)
        return itemSlug === dealSlug
      })
      if (deal) setHeroTitle(deal.name)
    } else if (isBrands && brandSlug) {
      const brand = sideItems.find(item => {
        const itemSlug = item.slug || createSlug(item.name)
        return itemSlug === brandSlug
      })
      if (brand) setHeroTitle(brand.name)
    } else if (subChildSlug && childSlug && parentSlug) {
      const parentCategory = sideItems.find(item => {
        const itemSlug = item.slug || createSlug(item.name)
        return itemSlug === parentSlug
      })
      if (parentCategory) {
        const childCategory = parentCategory.childrens?.find(child => {
          const childItemSlug = child.slug || createSlug(child.name)
          return childItemSlug === childSlug
        })
        if (childCategory) {
          const subChildCategory = childCategory.childrens?.find(subChild => {
            const subChildItemSlug = subChild.slug || createSlug(subChild.name)
            return subChildItemSlug === subChildSlug
          })
          if (subChildCategory) setHeroTitle(subChildCategory.name)
        }
      }
    } else if (childSlug && parentSlug) {
      const parentCategory = sideItems.find(item => {
        const itemSlug = item.slug || createSlug(item.name)
        return itemSlug === parentSlug
      })
      if (parentCategory) {
        const childCategory = parentCategory.childrens?.find(child => {
          const childItemSlug = child.slug || createSlug(child.name)
          return childItemSlug === childSlug
        })
        if (childCategory) setHeroTitle(childCategory.name)
      }
    } else if (parentSlug) {
      const parentCategory = sideItems.find(item => {
        const itemSlug = item.slug || createSlug(item.name)
        return itemSlug === parentSlug
      })
      if (parentCategory) setHeroTitle(parentCategory.name)
    } else {
      setHeroTitle(isCategories ? 'Categories' : isBrands ? 'Brands' : 'Deals')
    }
  }, [
    isDeals,
    isCategories,
    isBrands,
    brandSlug,
    parentSlug,
    childSlug,
    subChildSlug,
    dealSlug,
    sideItems,
    sidebarLoading
  ])

// ✅ Step 1: Filter by selected brands
const filteredProducts = useMemo(() => {
  if (selectedBrands.length === 0) return products

  return products.filter(product =>
    selectedBrands.includes(product.brand_id)
  )
}, [products, selectedBrands])

// ✅ Step 2: Sort filtered products
const sortedProducts = useMemo(() => {
  return [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 1:
        return a.name.localeCompare(b.name)
      case 2:
        return b.name.localeCompare(a.name)
      case 3:
        return a.price - b.price
      case 4:
        return b.price - a.price
      default:
        return 0
    }
  })
}, [filteredProducts, sortOption])

  // Generate SEO data based on page type and current selection
  const getSEOData = useMemo(() => {
    const baseUrl = SITE_URL
    let title = "Buraq - Premium Electrical & Hardware Solutions"
    let description = "UAE-based premium electrical and hardware supplier offering power tools, hand tools, lighting, and sanitary solutions. Our own brands NOVEX, BURAQ, CAVIL, and ZILCO."
    let keywords = "electrical products, hardware products, electrical solutions, hardware solutions, Buraq"
    let url = "/"
    let structuredData = null

    const getParentCategoryName = () => {
      if (parentSlug) {
        const parentCategory = sideItems.find(item => {
          const itemSlug = item.slug || createSlug(item.name)
          return itemSlug === parentSlug
        })
        return parentCategory ? parentCategory.name : 'Products'
      }
      return 'Products'
    }

    if (isCategories) {
      let parentName = ''
      let childName = ''
      let subChildName = ''
      
      if (parentSlug) {
        const parentCategory = sideItems.find(item => {
          const itemSlug = item.slug || createSlug(item.name)
          return itemSlug === parentSlug
        })
        if (parentCategory) {
          parentName = parentCategory.name
          
          if (childSlug && parentCategory.childrens) {
            const childCategory = parentCategory.childrens.find(child => {
              const childSlugVal = child.slug || createSlug(child.name)
              return childSlugVal === childSlug
            })
            if (childCategory) {
              childName = childCategory.name
              
              if (subChildSlug && childCategory.childrens) {
                const subChildCategory = childCategory.childrens.find(sub => {
                  const subSlugVal = sub.slug || createSlug(sub.name)
                  return subSlugVal === subChildSlug
                })
                if (subChildCategory) {
                  subChildName = subChildCategory.name
                }
              }
            }
          }
        }
      }
      
      const chainParts = [subChildName, childName, parentName].filter(Boolean)
      const chainTitle = chainParts.join(' - ')

      let fallbackTitle = "Categories - Electrical & Hardware Products | Buraq"
      let fallbackDescription = "Browse all electrical and hardware product categories at Buraq. Find the perfect products for your electrical and hardware needs."
      let fallbackKeywords = "categories, electrical categories, hardware categories, electrical products, hardware products, Buraq"

      if (subChildSlug && childSlug && parentSlug) {
        fallbackTitle = `${chainTitle} Products | Buraq`
        fallbackDescription = `Shop ${chainTitle.toLowerCase()} products at Buraq. Browse our extensive collection with competitive prices and fast delivery.`
        fallbackKeywords = `${chainParts.map(p => p.toLowerCase()).join(', ')}, electrical products, hardware products, Buraq`
        url = `/category/${parentSlug}/${childSlug}/${subChildSlug}`
      } else if (childSlug && parentSlug) {
        fallbackTitle = `${chainTitle} Products | Buraq`
        fallbackDescription = `Shop ${chainTitle.toLowerCase()} products at Buraq. Browse our extensive collection with competitive prices and fast delivery.`
        fallbackKeywords = `${chainParts.map(p => p.toLowerCase()).join(', ')}, electrical products, hardware products, Buraq`
        url = `/category/${parentSlug}/${childSlug}`
      } else if (parentSlug) {
        fallbackTitle = `${chainTitle} Products | Buraq`
        fallbackDescription = `Shop ${chainTitle.toLowerCase()} products at Buraq. Browse our extensive collection with competitive prices and fast delivery.`
        fallbackKeywords = `${chainParts.map(p => p.toLowerCase()).join(', ')}, electrical products, hardware products, Buraq`
        url = `/category/${parentSlug}`
      } else {
        url = "/category"
      }

      const heroLabel = heroTitle || chainTitle || 'Categories'
      const normalizedHeroKey = normalizeSeoKey(heroLabel)
      const heroMetaEntry = CATEGORY_SEO_MAP[normalizedHeroKey]

      if (heroMetaEntry) {
        title = heroMetaEntry.title
        description = heroMetaEntry.description
        keywords = `${heroLabel.toLowerCase()}, electrical products, hardware products, Buraq`
      } else {
        title = fallbackTitle
        description = fallbackDescription
        keywords = fallbackKeywords
      }
    } else if (isBrands) {
      if (brandSlug) {
        let parentName = ''
        let childName = ''
        let subChildName = ''
        let brandUrl = `/brand/${brandSlug}`

        const activeBrand = sideItems.find(item => {
          const itemSlug = item.slug || createSlug(item.name)
          return itemSlug === brandSlug
        })

        if (activeBrand && parentSlug) {
          const parentCategory = (activeBrand.childrens || []).find(cat => {
            const catSlug = cat.slug || createSlug(cat.name)
            return catSlug === parentSlug
          })
          if (parentCategory) {
            parentName = parentCategory.name
            brandUrl += `/${parentSlug}`

            if (childSlug && parentCategory.childrens) {
              const childCategory = parentCategory.childrens.find(child => {
                const childSlugVal = child.slug || createSlug(child.name)
                return childSlugVal === childSlug
              })
              if (childCategory) {
                childName = childCategory.name
                brandUrl += `/${childSlug}`

                if (subChildSlug && childCategory.childrens) {
                  const subChildCategory = childCategory.childrens.find(sub => {
                    const subSlugVal = sub.slug || createSlug(sub.name)
                    return subSlugVal === subChildSlug
                  })
                  if (subChildCategory) {
                    subChildName = subChildCategory.name
                    brandUrl += `/${subChildSlug}`
                  }
                }
              }
            }
          }
        }

        const chainParts = [subChildName, childName, parentName].filter(Boolean)
        const chainTitle = chainParts.length > 0 ? `${chainParts.join(' - ')} - ${heroTitle}` : heroTitle

        const brandMetaEntry = BRAND_SEO_MAP[brandSlug]
        if (brandMetaEntry && chainParts.length === 0) {
          title = brandMetaEntry.title
          description = brandMetaEntry.description
          keywords = `${heroTitle?.toLowerCase() || brandSlug}, brands, Buraq`
          url = `/brand/${brandSlug}`
        } else if (chainParts.length > 0) {
          title = `${chainTitle} Products | Buraq`
          description = `Shop ${chainTitle.toLowerCase()} products by ${heroTitle} at Buraq. Premium quality products with competitive prices and fast delivery.`
          keywords = `${chainParts.map(p => p.toLowerCase()).join(', ')}, ${heroTitle.toLowerCase()}, electrical products, hardware products, Buraq`
          url = brandUrl
        } else {
          title = `${heroTitle} - Electrical & Hardware Products | Buraq`
          description = `Shop ${heroTitle} electrical and hardware products at Buraq. Premium quality ${heroTitle} products with competitive prices and fast delivery.`
          keywords = `${heroTitle}, electrical products, hardware products, electrical solutions, hardware solutions, Buraq`
          url = `/brand/${brandSlug}`
        }
      } else {
        const defaultBrandMeta = BRAND_SEO_MAP['default']
        if (defaultBrandMeta) {
          title = defaultBrandMeta.title
          description = defaultBrandMeta.description
          keywords = "brands, electrical brands, hardware brands, Buraq"
        } else {
          title = "Brands - Electrical & Hardware Brands | Buraq"
          description = "Discover top electrical and hardware brands at Buraq. Shop from leading manufacturers with quality products and competitive prices."
          keywords = "brands, electrical brands, hardware brands, electrical products, hardware products, Buraq"
        }
        url = "/brand"
      }
    } else if (isDeals) {
      if (dealSlug) {
        let parentName = ''
        let childName = ''
        let subChildName = ''
        let dealsUrl = `/deals/${dealSlug}`

        const activeDeal = sideItems.find(item => {
          const itemSlug = item.slug || createSlug(item.name)
          return itemSlug === dealSlug
        })

        if (activeDeal && parentSlug) {
          const parentCategory = (activeDeal.childrens || []).find(cat => {
            const catSlug = cat.slug || createSlug(cat.name)
            return catSlug === parentSlug
          })
          if (parentCategory) {
            parentName = parentCategory.name
            dealsUrl += `/${parentSlug}`

            if (childSlug && parentCategory.childrens) {
              const childCategory = parentCategory.childrens.find(child => {
                const childSlugVal = child.slug || createSlug(child.name)
                return childSlugVal === childSlug
              })
              if (childCategory) {
                childName = childCategory.name
                dealsUrl += `/${childSlug}`

                if (subChildSlug && childCategory.childrens) {
                  const subChildCategory = childCategory.childrens.find(sub => {
                    const subSlugVal = sub.slug || createSlug(sub.name)
                    return subSlugVal === subChildSlug
                  })
                  if (subChildCategory) {
                    subChildName = subChildCategory.name
                    dealsUrl += `/${subChildSlug}`
                  }
                }
              }
            }
          }
        }

        const chainParts = [subChildName, childName, parentName].filter(Boolean)
        const chainTitle = chainParts.length > 0 ? `${chainParts.join(' - ')} - ${heroTitle}` : heroTitle

        const dealMetaEntry = DEALS_SEO_MAP[dealSlug]
        if (dealMetaEntry && chainParts.length === 0) {
          title = dealMetaEntry.title
          description = dealMetaEntry.description
          keywords = `${heroTitle?.toLowerCase() || dealSlug}, deals, Buraq`
          url = `/deals/${dealSlug}`
        } else if (chainParts.length > 0) {
          title = `${chainTitle} Deals | Buraq`
          description = `Explore ${chainTitle.toLowerCase()} deals at Buraq. Save on top-quality products with competitive prices and fast delivery.`
          keywords = `${chainParts.map(p => p.toLowerCase()).join(', ')}, ${heroTitle.toLowerCase()}, deals, Buraq`
          url = dealsUrl
        } else {
          title = `${heroTitle} - Special Deals & Offers | Buraq`
          description = `Get amazing deals on ${heroTitle.toLowerCase()} products at Buraq. Limited time offers with huge discounts on quality products.`
          keywords = `${heroTitle}, deals, offers, electrical deals, hardware deals, Buraq`
          url = `/deals/${dealSlug}`
        }
      } else {
        title = "Deals - Electrical & Hardware Special Offers | Buraq"
        description = "Discover amazing deals and special offers on electrical and hardware products at Buraq. Save big on quality products with limited time offers."
        keywords = "deals, offers, electrical deals, hardware deals, electrical products, hardware products, Buraq"
        url = "/deals"
      }
    }

    structuredData = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": heroTitle,
      "description": description,
      "url": `${baseUrl}${url}`,
      "mainEntity": {
        "@type": "ItemList",
        "name": heroTitle,
        "description": description,
        "numberOfItems": count || 0
      }
    }

    return { title, description, keywords, url, structuredData }
  }, [heroTitle, parentSlug, childSlug, subChildSlug, brandSlug, dealSlug, isCategories, isBrands, isDeals, count, sideItems])

  return (
    <Box className='w-full h-auto m-0 p-0'>
      <SEO
        title={getSEOData.title}
        description={getSEOData.description}
        keywords={getSEOData.keywords}
        url={getSEOData.url}
        structuredData={getSEOData.structuredData}
      />
      <Hero bg={bg} title={displayHeroTitle} />
    
      <Grid container className='py-16 px-10 bg-white md:px-14 lg:px-36'>
        {(isDeals || isBrands) ? (
          <DealsSidebar
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            sideItems={sideItems}
            handleParentClick={handleParentClick}
            handleChildClick={handleChildClick}
            handleSubChildClick={handleSubChildClick}
            sidebarLoading={sidebarLoading}
            Title={Title}
            mobileDrawerOpen={mobileDrawerOpen}
            setMobileDrawerOpen={setMobileDrawerOpen}
          />
        ) : (
          // ── Pass brands props to ProductSidebar (new) ──
          <ProductSidebar
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
            sideItems={sideItems}
            handleParentClick={handleParentClick}
            handleChildClick={handleChildClick}
            handleSubChildClick={handleSubChildClick}
            sidebarLoading={sidebarLoading}
            Title={Title}
            mobileDrawerOpen={mobileDrawerOpen}
            setMobileDrawerOpen={setMobileDrawerOpen}
            brands={brands}
            selectedBrands={selectedBrands}
            handleBrandToggle={handleBrandToggle}
          />
        )}
        
        <ProductFilters
          mobileFiltersOpen={mobileFiltersOpen}
          setMobileFiltersOpen={setMobileFiltersOpen}
          sortOption={sortOption}
          setSortOption={setSortOption}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
          handleSortOptionChange={handleSortOptionChange}
          setPriceSortText={setPriceSortText}
          setAlphaSortText={setAlphaSortText}
        />

        <Grid item xs={12} sm={9}>
          <ProductControls
            sortOn={sortOn}
            setSortOn={setSortOn}
            sortingOn={sortingOn}
            setSortingOn={setSortingOn}
            priceSortText={priceSortText}
            alphaSortText={alphaSortText}
            handleSortOptionChange={handleSortOptionChange}
            isGridView={isGridView}
            setIsGridView={setIsGridView}
            sortOption={sortOption}
            products={products}
            currentCategory={displayHeroTitle}
          />

          <Grid container className="mt-10">
            {productsLoading ? (
              <ProductLoadingSkeleton />
            ) : (
             <>
                {products.length === 0 && !productsLoading ? (
                  <Grid item xs={12} className="px-2.5 mb-5 text-center">
                    This {isCategories ? 'Category' : isBrands ? 'Brand' : 'Deal'} has no products {':)'}
                  </Grid>
                ) : isGridView ? (
                  <ProductGrid
                    sortedProducts={sortedProducts}
                    navigate={navigate}
                    handleModalClick={handleModalClick}
                  />
                ) : (
                  <ProductList
                    sortedProducts={sortedProducts}
                    navigate={navigate}
                    handleModalClick={handleModalClick}
                  />
                )}
                {products.length < count && !productsLoading && (
                  <Grid item xs={12} className="flex justify-center h-fit">
                    <Button
                      id="loadMoreButton"
                      className="bg-black text-white text-md cursor-pointer poppins uppercase p-4 mt-4 rounded-none"
                      onClick={handleLoadMoreClick}
                      disabled={loading}
                    >
                      {loading && <CircularProgress size={18} className="text-white " />}
                      {t("product.load_more")}
                    </Button>
                  </Grid>
                )}
              </>
            )}
          </Grid>

          {Object.keys(modalProduct)?.length > 0 && (
            <AddToCartModal
              visible={cartModal}
              setVisible={setCartModal}
              product={modalProduct}
            />
          )}
        </Grid>
        <RecentlyView/>
      <DeliveryTags/>
      </Grid>
    </Box>
  )
}

export default ProductsPage